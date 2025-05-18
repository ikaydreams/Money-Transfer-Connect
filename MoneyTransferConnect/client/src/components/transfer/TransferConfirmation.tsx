import { Button } from "@/components/ui/button";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Download } from "lucide-react";
import { RecipientInfo, TransferInfo } from "./TransferForm";

interface TransferConfirmationProps {
  transferInfo: TransferInfo;
  recipientInfo: RecipientInfo;
  transactionId: string;
  transactionDate: string;
  onStartNew: () => void;
}

const TransferConfirmation = ({
  transferInfo,
  recipientInfo,
  transactionId,
  transactionDate,
  onStartNew,
}: TransferConfirmationProps) => {
  // Prepare receipt data for download
  const downloadReceipt = () => {
    const receiptData = `
GlobalRemit - Transaction Receipt
---------------------------------
Transaction ID: ${transactionId}
Date & Time: ${transactionDate}

From: ${CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.name} (${CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.code})
To: ${CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.name} (${CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.code})

Amount Sent: ${formatCurrency(transferInfo.sendAmount, transferInfo.fromCountry as keyof typeof CURRENCIES)}
Fee: ${formatCurrency(transferInfo.fee, transferInfo.fromCountry as keyof typeof CURRENCIES)}
Total Paid: ${formatCurrency(transferInfo.sendAmount + transferInfo.fee, transferInfo.fromCountry as keyof typeof CURRENCIES)}

Amount Received: ${formatCurrency(transferInfo.receiveAmount, transferInfo.toCountry as keyof typeof CURRENCIES)}
Exchange Rate: 1 ${CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.symbol} = ${transferInfo.exchangeRate.toFixed(5)} ${CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.symbol}

Recipient: ${recipientInfo.firstName} ${recipientInfo.lastName}
Email: ${recipientInfo.email}
Phone: ${recipientInfo.phone}

Payment Method: ${PAYMENT_METHODS.find(method => method.id === transferInfo.paymentMethod)?.name || transferInfo.paymentMethod}
Status: Complete

Thank you for using GlobalRemit!
    `;
    
    // Create a blob and download it
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GlobalRemit-Receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Transfer Complete!</h3>
        <p className="text-neutral-800">
          Your money is on its way to the recipient.
        </p>
      </div>

      <div className="bg-neutral-100 rounded-md p-6 mb-6">
        <h4 className="text-lg font-medium mb-4">Transaction Summary</h4>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-800">Transaction ID</span>
            <span className="font-medium text-sm">{transactionId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Date & Time</span>
            <span className="font-medium">{transactionDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">From</span>
            <span className="font-medium">
              {CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.name} ({CURRENCIES[transferInfo.fromCountry as keyof typeof CURRENCIES]?.code})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">To</span>
            <span className="font-medium">
              {CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.name} ({CURRENCIES[transferInfo.toCountry as keyof typeof CURRENCIES]?.code})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Amount Sent</span>
            <span className="font-medium">
              {formatCurrency(transferInfo.sendAmount, transferInfo.fromCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Amount Received</span>
            <span className="font-medium">
              {formatCurrency(transferInfo.receiveAmount, transferInfo.toCountry as keyof typeof CURRENCIES)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Recipient</span>
            <span className="font-medium">
              {recipientInfo.firstName} {recipientInfo.lastName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-800">Status</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Button
          variant="outline"
          onClick={downloadReceipt}
          className="inline-flex items-center"
        >
          <Download className="h-4 w-4 mr-2" /> Download Receipt
        </Button>

        <div>
          <Button onClick={onStartNew}>Start New Transfer</Button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmation;
