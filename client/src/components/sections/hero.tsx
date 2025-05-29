import { useQuery } from "@tanstack/react-query";
import WaitlistForm from "@/components/waitlist-form";

export default function Hero() {
  const { data: countData } = useQuery({
    queryKey: ["/api/waitlist/count"],
  });

  const signupCount = countData?.count || 2547;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            The Future of{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Innovation
            </span>
            <br />
            Starts Here
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of forward-thinking professionals who are revolutionizing their workflow with AI-powered solutions. Be the first to experience the next generation of productivity tools.
          </p>
        </div>

        <WaitlistForm />
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-2xl lg:text-3xl font-bold text-slate-900">
              {signupCount.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Early Adopters</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900">50+</div>
            <div className="text-sm text-slate-600">Companies</div>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900">15 Days</div>
            <div className="text-sm text-slate-600">Until Launch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
