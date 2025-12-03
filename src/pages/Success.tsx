import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, Home, FileText, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { incidentId, formData } = location.state || {};

  useEffect(() => {
    // Redirect to home if no incident data
    if (!incidentId) {
      navigate('/');
    }
  }, [incidentId, navigate]);

  const copyIncidentId = () => {
    navigator.clipboard.writeText(incidentId);
    toast({
      title: "Copied!",
      description: "Incident ID copied to clipboard",
    });
  };

  if (!incidentId) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute w-32 h-32 bg-success/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-success flex items-center justify-center shadow-lg animate-scale-in">
              <CheckCircle2 className="w-12 h-12 text-success-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 animate-slide-up">
            Report Submitted!
          </h1>
          <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Thank you for helping us improve water services in Kericho County.
          </p>
        </div>

        {/* Incident ID Card */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Incident ID</p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-2xl md:text-3xl font-mono font-bold text-primary bg-secondary px-4 py-2 rounded-lg">
                  {incidentId}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyIncidentId}
                  className="shrink-0"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Save this ID to track your report status
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Report Summary */}
        {formData && (
          <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Report Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reporter</span>
                  <span className="font-medium text-foreground">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Type</span>
                  <span className="font-medium text-foreground capitalize">
                    {formData.issueType?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground text-right">
                    {formData.latitude?.toFixed(4)}, {formData.longitude?.toFixed(4)}
                  </span>
                </div>
                {formData.image && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photo</span>
                    <span className="font-medium text-success">Attached</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* What's Next */}
        <Card className="mb-8 bg-secondary/50 border-primary/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                Your report is reviewed by our team within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                A field team is dispatched to assess the issue
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                You'll receive updates via email and SMS
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Button asChild variant="hero" className="flex-1">
            <Link to="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/report">
              <Droplets className="w-5 h-5" />
              Report Another Issue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
