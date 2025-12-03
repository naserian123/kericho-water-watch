import { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

export const ImageUpload = ({ onImageSelect, selectedImage }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    } else {
      setPreview(null);
      onImageSelect(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border-2 border-border animate-scale-in">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3">
            <p className="text-sm text-primary-foreground truncate">
              {selectedImage?.name}
            </p>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium">Upload photo of the issue</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or use buttons below
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Browse
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
                Camera
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
