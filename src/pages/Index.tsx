import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, MapPin, Camera, CheckCircle2, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { WaveBackground } from '@/components/WaveBackground';

const features = [
  {
    icon: Camera,
    title: 'Photo Evidence',
    description: 'Capture and upload photos directly from your device',
  },
  {
    icon: MapPin,
    title: 'GPS Location',
    description: 'Automatic location capture for precise issue tracking',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Reports are processed and assigned within 24 hours',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your personal information is protected and secure',
  },
];

const stats = [
  { value: '2,500+', label: 'Reports Resolved' },
  { value: '24hrs', label: 'Avg Response Time' },
  { value: '98%', label: 'Resolution Rate' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        <WaveBackground />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
              <Droplets className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                Kericho County Water Services
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-slide-up">
              Report Water{' '}
              <span className="text-gradient">Leakages</span>{' '}
              & Issues
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Help us conserve water and improve service delivery. Report Non-Revenue Water issues like leaks, bursts, illegal connections, or broken meters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/report">
                  Report an Issue
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#how-it-works">
                  Learn More
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-muted/30 water-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reporting water issues has never been easier. Follow these simple steps to help us address problems quickly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Simple 4-Step Process
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { step: 1, title: 'Select Issue Type', desc: 'Choose from leaking pipe, burst, illegal connection, or broken meter' },
                { step: 2, title: 'Capture Photo', desc: 'Take or upload a clear photo of the water issue' },
                { step: 3, title: 'Share Location', desc: 'Your GPS coordinates are captured automatically' },
                { step: 4, title: 'Submit Report', desc: 'Receive an incident ID and track your report' },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center shrink-0 text-xl font-bold text-primary-foreground shadow-glow">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                    {index < 3 && (
                      <div className="w-0.5 h-8 bg-border ml-[23px] mt-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="hero" size="lg">
                <Link to="/report">
                  Start Reporting Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-foreground">Kericho Water</span>
                <span className="text-sm text-muted-foreground block">NRW Reporting System</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} Kericho County Water Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
