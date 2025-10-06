import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'This platform transformed our business!',
      videoUrl: 'https://www.youtube.com/embed/example',
    },
    {
      name: 'Jane Smith',
      feedback: 'A game-changer for our team.',
      videoUrl: 'https://www.youtube.com/embed/example2',
    },
  ];

  return (
    <section className="testimonials">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center mb-6">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <p className="text-lg mb-2">&ldquo;{testimonial.feedback}&rdquo;</p>
              <p className="text-sm font-bold">- {testimonial.name}</p>
              <iframe
                className="mt-4 w-full h-64"
                src={testimonial.videoUrl}
                title={`Testimonial by ${testimonial.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
