import { useState } from "react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, EXCHANGE_RATES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  transactionId: z.string().min(3, "Transaction ID is required"),
});

const receiverFormSchema = z.object({
  receivingCountry: z.string().min(1, "Please select a receiving country"),
  accountNumber: z.string().min(8, "Account number must be at least 8 characters"),
  accountName: z.string().min(3, "Account name is required"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  email: z.string().email("Please enter a valid email"),
});

const ReceiveMoney = () => {
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [isSetupLoading, setIsSetupLoading] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<"idle" | "success" | "error">("idle");
  const [setupStatus, setSetupStatus] = useState<"idle" | "success" | "error">("idle");
  const [transferDetails, setTransferDetails] = useState<any>(null);

  const { toast } = useToast();

  const trackingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: "",
    },
  });

  const receiverForm = useForm<z.infer<typeof receiverFormSchema>>({
    resolver: zodResolver(receiverFormSchema),
    defaultValues: {
      receivingCountry: "",
      accountNumber: "",
      accountName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const onTrackSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsTrackingLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For this example, let's create a mock transfer
      const mockTransfer = {
        transactionId: data.transactionId,
        senderName: "John Smith",
        fromCountry: "US",
        toCountry: "GH",
        amount: "250.00",
        fee: "5.00",
        status: "Completed",
        date: "May 18, 2023",
        estimatedDelivery: "May 19, 2023",
      };
      
      setTransferDetails(mockTransfer);
      setTrackingStatus("success");
      
      toast({
        title: "Transfer Found",
        description: "Transfer details have been retrieved successfully.",
      });
    } catch (error) {
      console.error("Tracking failed:", error);
      setTrackingStatus("error");
      toast({
        title: "Tracking Failed",
        description: "No transfer found with that ID. Please check and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTrackingLoading(false);
    }
  };

  const onReceiverSubmit = async (data: z.infer<typeof receiverFormSchema>) => {
    setIsSetupLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSetupStatus("success");
      
      toast({
        title: "Receiver Setup Complete",
        description: "Your receiving account has been set up successfully.",
      });
    } catch (error) {
      console.error("Setup failed:", error);
      setSetupStatus("error");
      toast({
        title: "Setup Failed",
        description: "There was an error setting up your receiving account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSetupLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Receive Money | GlobalRemit</title>
        <meta name="description" content="Track your incoming transfers or set up your account to receive money with GlobalRemit." />
      </Helmet>

      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Receive Money Internationally
          </h2>

          <Tabs defaultValue="track" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="track">Track a Transfer</TabsTrigger>
              <TabsTrigger value="setup">Set Up Receiving Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="track">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Track Your Transfer</CardTitle>
                  <CardDescription>
                    Enter the transaction ID provided by the sender
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {trackingStatus === "success" && transferDetails ? (
                    <div className="space-y-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-success" />
                        </div>
                      </div>
                      
                      <div className="bg-neutral-100 rounded-md p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Transaction ID</span>
                          <span className="font-medium">{transferDetails.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Sender</span>
                          <span className="font-medium">{transferDetails.senderName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">From</span>
                          <span className="font-medium">
                            {CURRENCIES[transferDetails.fromCountry as keyof typeof CURRENCIES]?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">To</span>
                          <span className="font-medium">
                            {CURRENCIES[transferDetails.toCountry as keyof typeof CURRENCIES]?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Amount</span>
                          <span className="font-medium">
                            {formatCurrency(parseFloat(transferDetails.amount), transferDetails.toCountry as keyof typeof CURRENCIES)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Status</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                            {transferDetails.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Date Sent</span>
                          <span className="font-medium">{transferDetails.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-800">Estimated Delivery</span>
                          <span className="font-medium">{transferDetails.estimatedDelivery}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setTrackingStatus("idle");
                          setTransferDetails(null);
                          trackingForm.reset();
                        }}
                        className="w-full"
                      >
                        Track Another Transfer
                      </Button>
                    </div>
                  ) : (
                    <Form {...trackingForm}>
                      <form onSubmit={trackingForm.handleSubmit(onTrackSubmit)} className="space-y-4">
                        <FormField
                          control={trackingForm.control}
                          name="transactionId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transaction ID</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. TR-AB123XYZ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isTrackingLoading}
                        >
                          {isTrackingLoading ? "Tracking..." : "Track Transfer"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="setup">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Set Up Your Receiving Account</CardTitle>
                  <CardDescription>
                    Enter your account details to receive money
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {setupStatus === "success" ? (
                    <div className="space-y-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-success" />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold">Account Setup Complete!</h3>
                        <p className="text-neutral-800">
                          Your receiving account has been set up successfully. You can now receive money from abroad.
                        </p>
                        <p className="text-sm text-neutral-600 mt-4">
                          Share your details with the sender to start receiving money.
                        </p>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setSetupStatus("idle");
                          receiverForm.reset();
                        }}
                        className="w-full"
                      >
                        Set Up Another Account
                      </Button>
                    </div>
                  ) : (
                    <Form {...receiverForm}>
                      <form onSubmit={receiverForm.handleSubmit(onReceiverSubmit)} className="space-y-4">
                        <FormField
                          control={receiverForm.control}
                          name="receivingCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Receiving Country</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="GH">Ghana (GHS)</SelectItem>
                                  <SelectItem value="US">United States (USD)</SelectItem>
                                  <SelectItem value="EU">Europe (EUR)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={receiverForm.control}
                          name="accountNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Number / Mobile Money Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your account or mobile money number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={receiverForm.control}
                          name="accountName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Holder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter the account holder's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={receiverForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+233 XX XXX XXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={receiverForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isSetupLoading}
                        >
                          {isSetupLoading ? "Setting Up..." : "Complete Setup"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default ReceiveMoney;