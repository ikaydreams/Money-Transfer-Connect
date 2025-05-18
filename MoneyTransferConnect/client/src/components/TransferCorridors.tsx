import { Link } from "wouter";
import { CORRIDORS } from "@/lib/constants";

const TransferCorridors = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Transfer Corridors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORRIDORS.map((corridor, index) => (
            <div key={index} className="bg-neutral-100 rounded-lg p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden bg-primary-light mr-4">
                  <span className="text-2xl font-bold text-primary">{corridor.from.code}</span>
                </div>
                <i className="ri-arrow-right-line text-xl text-primary mx-2"></i>
                <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden bg-primary-light ml-4">
                  <span className="text-2xl font-bold text-primary">{corridor.to.code}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {corridor.from.name} to {corridor.to.name}
              </h3>
              <p className="text-neutral-800 text-center mb-4">
                {corridor.description}
              </p>
              <div className="text-center">
                <Link href={`/send-money?from=${corridor.from.code}&to=${corridor.to.code}`}>
                  <a className="text-primary font-medium hover:text-primary-dark">
                    Learn More
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransferCorridors;
