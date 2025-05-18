import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Download Our Mobile App
            </h2>
            <p className="text-white/80 mb-6">
              Get the GlobalRemit app for faster transfers, track your
              transactions, and receive instant notifications.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-black hover:bg-neutral-900 text-white border-black"
              >
                <i className="ri-apple-fill text-2xl mr-2"></i>
                <span>App Store</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-black hover:bg-neutral-900 text-white border-black"
              >
                <i className="ri-google-play-fill text-2xl mr-2"></i>
                <span>Google Play</span>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="bg-white rounded-lg shadow-lg p-2 overflow-hidden">
              {/* Sample mobile app UI mockup */}
              <div className="bg-primary-light rounded-lg aspect-[9/16] flex flex-col">
                <div className="bg-primary p-4 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <i className="ri-exchange-dollar-line text-white text-xl"></i>
                      <span className="text-white font-semibold">GlobalRemit</span>
                    </div>
                    <i className="ri-user-line text-white"></i>
                  </div>
                </div>
                <div className="flex-grow bg-white p-4 flex flex-col gap-4">
                  <div className="bg-neutral-100 rounded-lg p-3">
                    <div className="text-sm text-neutral-800">Send money to</div>
                    <div className="font-semibold">United States</div>
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3">
                    <div className="text-sm text-neutral-800">You send</div>
                    <div className="font-semibold">₵1,000.00</div>
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3">
                    <div className="text-sm text-neutral-800">They receive</div>
                    <div className="font-semibold">$83.25</div>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-secondary text-white font-medium py-3 rounded-md text-center">
                      Continue
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
