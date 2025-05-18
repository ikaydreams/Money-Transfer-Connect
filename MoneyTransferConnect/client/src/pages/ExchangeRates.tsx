import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CURRENCIES, EXCHANGE_RATES } from "@/lib/constants";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { RefreshCw } from "lucide-react";

const formSchema = z.object({
  fromCurrency: z.string().min(1, "Please select a currency"),
  toCurrency: z.string().min(1, "Please select a currency"),
  amount: z.coerce.number().positive("Amount must be positive"),
});

const ExchangeRates = () => {
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Populate exchange rates table data
  const rateEntries = Object.entries(EXCHANGE_RATES).map(([key, rate]) => {
    const [fromCode, toCode] = key.split('-');
    return {
      key,
      fromCode,
      fromCurrency: CURRENCIES[fromCode as keyof typeof CURRENCIES]?.name || fromCode,
      fromSymbol: CURRENCIES[fromCode as keyof typeof CURRENCIES]?.symbol || '',
      toCode,
      toCurrency: CURRENCIES[toCode as keyof typeof CURRENCIES]?.name || toCode,
      toSymbol: CURRENCIES[toCode as keyof typeof CURRENCIES]?.symbol || '',
      rate
    };
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCurrency: "GH",
      toCurrency: "US",
      amount: 100,
    },
  });

  const { watch } = form;
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");
  const amount = watch("amount");

  useEffect(() => {
    // Update the conversion result when form values change
    if (fromCurrency && toCurrency && amount) {
      const rateKey = `${fromCurrency}-${toCurrency}`;
      const rate = EXCHANGE_RATES[rateKey as keyof typeof EXCHANGE_RATES];
      
      if (rate) {
        setResult(amount * rate);
      } else {
        setResult(null);
      }
    }
  }, [fromCurrency, toCurrency, amount]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const rateKey = `${data.fromCurrency}-${data.toCurrency}`;
      const rate = EXCHANGE_RATES[rateKey as keyof typeof EXCHANGE_RATES];
      
      if (rate) {
        setResult(data.amount * rate);
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <>
      <Helmet>
        <title>Exchange Rates | GlobalRemit</title>
        <meta name="description" content="View the latest exchange rates and convert between currencies with GlobalRemit's competitive rates." />
      </Helmet>

      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Exchange Rates
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Currency Converter */}
            <Card>
              <CardHeader>
                <CardTitle>Currency Converter</CardTitle>
                <CardDescription>
                  Convert between currencies with our competitive rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fromCurrency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="GH">
                                  Ghana (GHS)
                                </SelectItem>
                                <SelectItem value="US">
                                  US Dollar (USD)
                                </SelectItem>
                                <SelectItem value="EU">
                                  Euro (EUR)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="toCurrency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="US">
                                  US Dollar (USD)
                                </SelectItem>
                                <SelectItem value="GH">
                                  Ghana (GHS)
                                </SelectItem>
                                <SelectItem value="EU">
                                  Euro (EUR)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                {CURRENCIES[fromCurrency as keyof typeof CURRENCIES]?.symbol}
                              </span>
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="mt-6">
                      <div className="bg-neutral-100 p-4 rounded-md">
                        <div className="text-sm text-neutral-800 mb-1">Result</div>
                        <div className="text-2xl font-semibold">
                          {result !== null ? (
                            <>
                              {CURRENCIES[toCurrency as keyof typeof CURRENCIES]?.symbol}
                              {result.toLocaleString(undefined, { 
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </>
                          ) : (
                            "Select currencies and amount"
                          )}
                        </div>
                        {result !== null && (
                          <div className="text-sm text-neutral-600 mt-2">
                            1 {CURRENCIES[fromCurrency as keyof typeof CURRENCIES]?.symbol} = {" "}
                            {EXCHANGE_RATES[`${fromCurrency}-${toCurrency}` as keyof typeof EXCHANGE_RATES]?.toFixed(5)}{" "}
                            {CURRENCIES[toCurrency as keyof typeof CURRENCIES]?.symbol}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isCalculating}
                      className="w-full"
                    >
                      {isCalculating ? "Converting..." : "Convert"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Current Exchange Rates */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Current Exchange Rates</CardTitle>
                  <CardDescription>
                    Last updated: {lastUpdated.toLocaleString()}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Official rates based on market data</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Currency Pair</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rateEntries.map((entry) => (
                      <TableRow key={entry.key}>
                        <TableCell>
                          {entry.fromCode} → {entry.toCode}
                        </TableCell>
                        <TableCell className="text-right">
                          1 {entry.fromSymbol} = {entry.rate.toFixed(5)} {entry.toSymbol}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExchangeRates;