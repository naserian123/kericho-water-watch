import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, User, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IssueTypeCard } from './IssueTypeCard';
import { ImageUpload } from './ImageUpload';
import { LocationCapture } from './LocationCapture';
import { useGeolocation } from '@/hooks/useGeolocation';
import { IssueType, ReportFormData } from '@/types/report';
import { toast } from '@/hooks/use-toast';

const issueTypes: IssueType[] = ['leaking_pipe', 'burst_pipe', 'illegal_connection', 'broken_meter', 'other'];

export const ReportForm = () => {
  const navigate = useNavigate();
  const { latitude, longitude, loading: geoLoading, error: geoError, getLocation } = useGeolocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ReportFormData>({
    fullName: '',
    phone: '',
    email: '',
    issueType: 'leaking_pipe',
    description: '',
    latitude: null,
    longitude: null,
    image: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReportFormData, string>>>({});

  // Auto-capture location on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Update form data when location changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReportFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide more details (at least 20 characters)';
    }

    if (formData.latitude === null || formData.longitude === null) {
      newErrors.latitude = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - In production, this would submit to backend
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a mock incident ID
    const incidentId = `KRW-${Date.now().toString(36).toUpperCase()}`;

    setIsSubmitting(false);

    // Navigate to success page with incident ID
    navigate('/success', { 
      state: { 
        incidentId,
        formData: {
          ...formData,
          image: formData.image?.name || null,
        }
      } 
    });
  };

  const handleInputChange = (field: keyof ReportFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Issue Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Type of Issue</CardTitle>
          <CardDescription>Select the category that best describes the problem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {issueTypes.map((type) => (
              <IssueTypeCard
                key={type}
                type={type}
                selected={formData.issueType === type}
                onSelect={(t) => handleInputChange('issueType', t)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Information</CardTitle>
          <CardDescription>We'll use this to follow up on your report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Issue Details</CardTitle>
          <CardDescription>Provide as much detail as possible</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Description
            </label>
            <Textarea
              placeholder="Describe the issue in detail (location landmarks, severity, how long it has been occurring, etc.)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-destructive' : ''}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Photo Evidence</CardTitle>
          <CardDescription>Upload a clear photo of the issue</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            selectedImage={formData.image}
            onImageSelect={(file) => setFormData(prev => ({ ...prev, image: file }))}
          />
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
          <CardDescription>Your GPS coordinates help us locate the issue</CardDescription>
        </CardHeader>
        <CardContent>
          <LocationCapture
            latitude={formData.latitude}
            longitude={formData.longitude}
            loading={geoLoading}
            error={geoError || (errors.latitude ? 'Location is required' : null)}
            onGetLocation={getLocation}
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        size="xl"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Submitting Report...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Report
          </>
        )}
      </Button>
    </form>
  );
};
