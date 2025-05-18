import { Button } from "@/components/ui/button";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { RecipientInfo, TransferInfo } from "./TransferForm";

interface TransferReviewProps {
  transferInfo: TransferInfo;
  recipientInfo: RecipientInfo;
  onBack: () => void;
  onContinue: () => void;
}

const TransferReview = ({
  transferInfo,
  recipientInfo,
  onBack,
  onContinue,
}: TransferReviewProps) => {
  // Get country names from currency codes
  const fromCountryName = CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.name || transferInfo.fromCountry;
  const toCountryName = CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.name || transferInfo.toCountry;
  
  // Calculate total to pay
  const totalToPay = transferInfo.sendAmount + transferInfo.fee;
  
  // Get payment method name
  const paymentMethod = PAYMENT_METHODS.find(method => method.id === transferInfo.paymentMethod)?.name || transferInfo.paymentMethod;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Review Transfer</h3>

      <div className="bg-neutral-100 rounded-md p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Transfer Details</h4>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-800">From</span>
            <span className="font-medium">
              {fromCountryName} ({CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.code})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">To</span>
            <span className="font-medium">
              {toCountryName} ({CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.code})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Amount to Send</span>
            <span className="font-medium">
              {formatCurrency(transferInfo.sendAmount, transferInfo.fromCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Transfer Fee</span>
            <span className="font-medium">
              {formatCurrency(transferInfo.fee, transferInfo.fromCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between border-t border-neutral-200 pt-3">
            <span className="text-neutral-800">Total to Pay</span>
            <span className="font-medium">
              {formatCurrency(totalToPay, transferInfo.fromCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Recipient Gets</span>
            <span className="font-medium">
              {formatCurrency(transferInfo.receiveAmount, transferInfo.toCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Exchange Rate</span>
            <span className="font-medium">
              1 {CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.symbol} = {transferInfo.exchangeRate.toFixed(5)} {CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.symbol}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 rounded-md p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Recipient</h4>

        <div className="space-y-2">
          <p>
            <span className="text-neutral-800">Name:</span>{" "}
            <span className="font-medium">
              {recipientInfo.firstName} {recipientInfo.lastName}
            </span>
          </p>
          <p>
            <span className="text-neutral-800">Email:</span>{" "}
            <span className="font-medium">{recipientInfo.email}</span>
          </p>
          <p>
            <span className="text-neutral-800">Phone:</span>{" "}
            <span className="font-medium">{recipientInfo.phone}</span>
          </p>
        </div>
      </div>

      <div className="bg-neutral-100 rounded-md p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Payment Method</h4>
        <p className="font-medium">{paymentMethod}</p>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue}>Proceed to Payment</Button>
      </div>
    </div>
  );
};

export default TransferReview;
