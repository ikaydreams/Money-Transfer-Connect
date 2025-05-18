import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formatCurrency, generateTransactionId, formatTransactionDate } from "@/lib/utils";
import { CURRENCIES } from "@/lib/constants";
import { Shield } from "lucide-react";

interface TransferPaymentProps {
  totalAmount: number;
  currencyCode: string;
  onBack: () => void;
  onComplete: (transactionId: string, transactionDate: string) => void;
}

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^[0-9\s]+$/, "Card number must contain only digits"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvv: z.string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^[0-9]+$/, "CVV must contain only digits"),
  nameOnCard: z.string().min(3, "Name on card is required"),
});

const TransferPayment = ({
  totalAmount,
  currencyCode,
  onBack,
  onComplete,
}: TransferPaymentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate transaction ID and date
      const transactionId = generateTransactionId();
      const transactionDate = formatTransactionDate();
      
      // Complete the transfer
      onComplete(transactionId, transactionDate);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Complete Payment</h3>

      <div className="bg-neutral-100 rounded-md p-6 mb-6">
        <div className="flex justify-between mb-4">
          <span className="text-neutral-800">Amount to Pay</span>
          <span className="font-medium text-lg">
            {formatCurrency(totalAmount, currencyCode as keyof typeof CURRENCIES)}
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="0000 0000 0000 0000"
                      {...field}
                      onChange={(e) => {
                        // Format card number with spaces every 4 digits
                        const value = e.target.value.replace(/\s/g, '');
                        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="MM/YY"
                        {...field}
                        onChange={(e) => {
                          // Format expiry date with slash
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 2) {
                            field.onChange(value);
                          } else {
                            field.onChange(value.substring(0, 2) + '/' + value.substring(2, 4));
                          }
                        }}
                        maxLength={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123"
                        maxLength={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-neutral-100 rounded-md p-4 mt-4">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Your payment information is secure and encrypted. We do not store your card details.
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Complete Transfer"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TransferPayment;
