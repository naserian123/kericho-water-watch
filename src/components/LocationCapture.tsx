import { MapPin, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LocationCaptureProps {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  onGetLocation: () => void;
}

export const LocationCapture = ({ 
  latitude, 
  longitude, 
  loading, 
  error, 
  onGetLocation 
}: LocationCaptureProps) => {
  const hasLocation = latitude !== null && longitude !== null;

  return (
    <div className="space-y-3">
      <div className={cn(
        "rounded-xl border-2 p-4 transition-all duration-300",
        hasLocation 
          ? "border-success bg-success/5" 
          : error 
            ? "border-destructive bg-destructive/5"
            : "border-border bg-card"
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            hasLocation 
              ? "bg-success text-success-foreground" 
              : error 
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground"
          )}>
            {hasLocation ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : error ? (
              <XCircle className="w-6 h-6" />
            ) : (
              <MapPin className="w-6 h-6" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {hasLocation ? (
              <>
                <p className="font-medium text-foreground">Location Captured</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Lat: {latitude?.toFixed(6)}, Long: {longitude?.toFixed(6)}
                </p>
              </>
            ) : error ? (
              <>
                <p className="font-medium text-destructive">Location Error</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </>
            ) : (
              <>
                <p className="font-medium text-foreground">GPS Location Required</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the button to capture your current location
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant={hasLocation ? "outline" : "default"}
        onClick={onGetLocation}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Getting Location...
          </>
        ) : hasLocation ? (
          <>
            <RefreshCw className="w-4 h-4" />
            Update Location
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4" />
            Get My Location
          </>
        )}
      </Button>
    </div>
  );
};
