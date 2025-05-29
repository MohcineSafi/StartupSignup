import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
