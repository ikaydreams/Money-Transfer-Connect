import { useState, useEffect } from "react";
import { 
  CURRENCIES, 
  EXCHANGE_RATES, 
  TRANSFER_FEES, 
  DELIVERY_TIMES,
  PAYMENT_METHODS 
} from "@/lib/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatCurrency } from "@/lib/utils";
import { RecipientInfo, TransferInfo } from "./TransferForm";

interface TransferDetailsProps {
  transferInfo: TransferInfo;
  setTransferInfo: (info: TransferInfo) => void;
  recipientInfo: RecipientInfo;
  setRecipientInfo: (info: RecipientInfo) => void;
  onContinue: () => void;
}

const formSchema = z.object({
  fromCountry: z.string(),
  toCountry: z.string().refine(
    (val) => val !== '', 
    { message: "Please select a destination country" }
  ),
  sendAmount: z.coerce.number().positive({
    message: "Amount must be greater than zero",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Valid phone number is required"),
  paymentMethod: z.string(),
});

const TransferDetails = ({
  transferInfo,
  setTransferInfo,
  recipientInfo,
  setRecipientInfo,
  onContinue,
}: TransferDetailsProps) => {
  const [receiveAmount, setReceiveAmount] = useState<number>(transferInfo.receiveAmount);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCountry: transferInfo.fromCountry,
      toCountry: transferInfo.toCountry,
      sendAmount: transferInfo.sendAmount,
      firstName: recipientInfo.firstName,
      lastName: recipientInfo.lastName,
      email: recipientInfo.email,
      phone: recipientInfo.phone,
      paymentMethod: transferInfo.paymentMethod,
    },
  });

  const { watch, setValue } = form;
  const fromCountry = watch("fromCountry");
  const toCountry = watch("toCountry");
  const sendAmount = watch("sendAmount");

  // Update exchange rate calculations when countries or amount changes
  useEffect(() => {
    if (fromCountry && toCountry && sendAmount) {
      const rateKey = `${fromCountry}-${toCountry}`;
      const rate = EXCHANGE_RATES[rateKey as keyof typeof EXCHANGE_RATES] || 1;
      const calculatedAmount = sendAmount * rate;
      setReceiveAmount(parseFloat(calculatedAmount.toFixed(2)));

      // Update the delivery time based on the transfer corridor
      const deliveryTime = DELIVERY_TIMES[rateKey as keyof typeof DELIVERY_TIMES] || "1-3 Business Days";

      // Get fee for the source country
      const fee = TRANSFER_FEES[fromCountry as keyof typeof TRANSFER_FEES] || 0;

      // Update transfer info with new calculations
      setTransferInfo({
        ...transferInfo,
        fromCountry,
        toCountry,
        sendAmount,
        receiveAmount: calculatedAmount,
        exchangeRate: rate,
        deliveryTime,
        fee,
      });
    }
  }, [fromCountry, toCountry, sendAmount, setTransferInfo]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update recipient info
    setRecipientInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });

    // Update payment method in transfer info
    setTransferInfo({
      ...transferInfo,
      paymentMethod: data.paymentMethod,
    });

    // Move to next step
    onContinue();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Enter Transfer Details</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Countries Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fromCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GH">
                        Ghana ({CURRENCIES.GH.code})
                      </SelectItem>
                      <SelectItem value="US">
                        United States ({CURRENCIES.US.code})
                      </SelectItem>
                      <SelectItem value="EU">
                        Europe ({CURRENCIES.EU.code})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="toCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="US">
                        United States ({CURRENCIES.US.code})
                      </SelectItem>
                      <SelectItem value="GH">
                        Ghana ({CURRENCIES.GH.code})
                      </SelectItem>
                      <SelectItem value="EU">
                        Europe ({CURRENCIES.EU.code})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Amount Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="sendAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>You Send</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        {CURRENCIES[fromCountry as keyof typeof CURRENCIES]?.symbol}
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label>They Receive</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {CURRENCIES[toCountry as keyof typeof CURRENCIES]?.symbol}
                </span>
                <Input
                  type="text"
                  value={receiveAmount.toFixed(2)}
                  readOnly
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="bg-neutral-100 p-4 rounded-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="text-sm text-neutral-800">Exchange Rate</p>
                <p className="font-medium">
                  1 {CURRENCIES[fromCountry as keyof typeof CURRENCIES]?.symbol} ={" "}
                  {transferInfo.exchangeRate.toFixed(5)}{" "}
                  {CURRENCIES[toCountry as keyof typeof CURRENCIES]?.symbol}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-800">Fee</p>
                <p className="font-medium">
                  {formatCurrency(
                    transferInfo.fee,
                    fromCountry as keyof typeof CURRENCIES
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-800">Delivery Time</p>
                <p className="font-medium">{transferInfo.deliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Recipient Details */}
          <div>
            <h4 className="text-lg font-medium mb-4">Recipient Details</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="text-lg font-medium mb-4">Payment Method</h4>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <div key={method.id} className="flex items-center space-x-4">
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                          />
                          <Label htmlFor={method.id} className="font-medium">
                            {method.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TransferDetails;
