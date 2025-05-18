import { TESTIMONIALS } from "@/lib/constants";

const Testimonials = () => {
  // Helper to render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="ri-star-fill"></i>);
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(<i key="half-star" className="ri-star-half-fill"></i>);
    }

    // Add empty stars to reach 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line"></i>);
    }

    return stars;
  };

  return (
    <section className="py-12 md:py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {renderRating(testimonial.rating)}
                </div>
              </div>
              <p className="text-neutral-800 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-neutral-800">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
