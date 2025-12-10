-- Create reports table
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  description TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  image_url TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reports (public reporting)
CREATE POLICY "Anyone can submit reports" 
ON public.reports 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view reports
CREATE POLICY "Anyone can view reports" 
ON public.reports 
FOR SELECT 
USING (true);

-- Create storage bucket for report images
INSERT INTO storage.buckets (id, name, public) VALUES ('report-images', 'report-images', true);

-- Allow public uploads to the bucket
CREATE POLICY "Anyone can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'report-images');

-- Allow public read access to images
CREATE POLICY "Anyone can view images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'report-images');