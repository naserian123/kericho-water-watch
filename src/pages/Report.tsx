import { Header } from '@/components/Header';
import { ReportForm } from '@/components/ReportForm';
import { WaveBackground } from '@/components/WaveBackground';

const Report = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative pt-24 pb-16">
        <WaveBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Page Header */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-slide-up">
              Report Water Issue
            </h1>
            <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Fill out the form below to report a water leakage, burst pipe, illegal connection, or broken meter in Kericho County.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <ReportForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
