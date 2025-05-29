import { Star } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    text: "The AI automation has completely transformed how our team operates. We're 40% more productive!",
    author: "Sarah Johnson",
    role: "CEO, TechFlow",
    initials: "SJ",
    bgColor: "bg-gradient-to-r from-blue-400 to-blue-600"
  },
  {
    stars: 5,
    text: "InnovateLab's intuitive design makes complex workflows feel effortless. Can't wait for the full release!",
    author: "Michael Chen",
    role: "Product Manager, Innovate Inc",
    initials: "MC",
    bgColor: "bg-gradient-to-r from-green-400 to-green-600"
  },
  {
    stars: 5,
    text: "The collaboration features are game-changing. Our remote team has never been more connected.",
    author: "Emily Rodriguez",
    role: "Design Lead, Creative Co",
    initials: "ER",
    bgColor: "bg-gradient-to-r from-purple-400 to-purple-600"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            What Early Users Are Saying
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
