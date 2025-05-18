import { FEATURES } from "@/lib/constants";

const Features = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Why Choose GlobalRemit?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-neutral-100 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-3xl text-primary`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
