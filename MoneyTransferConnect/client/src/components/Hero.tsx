import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-primary">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Background image could be added via CSS if needed */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Send Money Globally with Confidence
          </h1>
          <p className="text-white text-lg md:text-xl mb-8">
            Fast, secure, and affordable money transfers between Ghana, US, and
            Europe.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg"
              asChild
              className="bg-secondary hover:bg-secondary-dark text-white"
            >
              <Link href="/send-money">
                <a>Send Money Now</a>
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              asChild
              className="bg-white text-primary hover:bg-neutral-200 border-white"
            >
              <Link href="/exchange-rates">
                <a>Check Rates</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
