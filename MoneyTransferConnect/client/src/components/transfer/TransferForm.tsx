import { useState } from "react";
import { TRANSFER_STEPS } from "@/lib/constants";
import { StepIndicator } from "@/components/ui/step-indicator";
import TransferDetails from "./TransferDetails";
import TransferReview from "./TransferReview";
import TransferPayment from "./TransferPayment";
import TransferConfirmation from "./TransferConfirmation";

export interface RecipientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface TransferInfo {
  fromCountry: string;
  toCountry: string;
  sendAmount: number;
  receiveAmount: number;
  fee: number;
  exchangeRate: number;
  deliveryTime: string;
  paymentMethod: string;
}

const TransferForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [transferInfo, setTransferInfo] = useState<TransferInfo>({
    fromCountry: "GH",
    toCountry: "US",
    sendAmount: 1000,
    receiveAmount: 83.25,
    fee: 15,
    exchangeRate: 0.08325,
    deliveryTime: "1-2 Business Days",
    paymentMethod: "bank-transfer"
  });
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // Render the appropriate form step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TransferDetails
            transferInfo={transferInfo}
            setTransferInfo={setTransferInfo}
            recipientInfo={recipientInfo}
            setRecipientInfo={setRecipientInfo}
            onContinue={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <TransferReview
            transferInfo={transferInfo}
            recipientInfo={recipientInfo}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <TransferPayment
            totalAmount={transferInfo.sendAmount + transferInfo.fee}
            currencyCode={transferInfo.fromCountry}
            onBack={() => setCurrentStep(2)}
            onComplete={(id, date) => {
              setTransactionId(id);
              setTransactionDate(date);
              setCurrentStep(4);
            }}
          />
        );
      case 4:
        return (
          <TransferConfirmation
            transferInfo={transferInfo}
            recipientInfo={recipientInfo}
            transactionId={transactionId}
            transactionDate={transactionDate}
            onStartNew={() => {
              // Reset form and go to step 1
              setTransferInfo({
                ...transferInfo,
                sendAmount: 1000,
                receiveAmount: 83.25
              });
              setRecipientInfo({
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
              });
              setCurrentStep(1);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Step indicator */}
      <StepIndicator steps={TRANSFER_STEPS} currentStep={currentStep} />
      
      {/* Form content */}
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default TransferForm;
