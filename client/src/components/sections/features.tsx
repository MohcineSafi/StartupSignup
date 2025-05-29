import { Bot, TrendingUp, Smartphone, Plug, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Smart Automation",
    description: "Automate repetitive tasks with intelligent workflows that learn from your behavior.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Gain deep insights into your productivity patterns with comprehensive reporting.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access your workspace anywhere with our beautifully designed mobile apps.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Connect with over 1000+ tools and services through our robust API platform.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Clock,
    title: "Real-time Sync",
    description: "Stay synchronized across all devices with instant updates and offline support.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated customer success team.",
    color: "bg-red-100 text-red-600"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features Coming Soon
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get ready for a complete transformation of your workflow with these groundbreaking features.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
