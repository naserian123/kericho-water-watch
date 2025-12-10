import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Report = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("leaking_pipe");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Could not capture location. Please enable GPS.");
      }
    );
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("report-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      toast.error("Failed to upload image");
      return null;
    }

    const { data } = supabase.storage
      .from("report-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const submitReport = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      const { error } = await supabase.from("reports").insert([
        {
          name,
          phone,
          email: email || null,
          description,
          issue_type: issueType,
          image_url: imageUrl,
          latitude,
          longitude,
        },
      ]);

      if (error) {
        console.error("Submit error:", error);
        toast.error("Error submitting report");
        setIsSubmitting(false);
        return;
      }

      toast.success("Report submitted successfully!");
      navigate("/success");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong");
      setIsSubmitting(false);
    }
  };

  const issueTypes = [
    { value: "leaking_pipe", label: "Leaking Pipe" },
    { value: "burst_pipe", label: "Burst Pipe" },
    { value: "illegal_connection", label: "Illegal Connection" },
    { value: "broken_meter", label: "Broken Meter" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-xl mx-auto bg-card shadow-xl rounded-xl p-6 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Report Water Issue
        </h2>

        <form className="space-y-4" onSubmit={submitReport}>
          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
              required
            >
              {issueTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg border bg-background"
              placeholder="Enter your name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 rounded-lg border bg-background"
              placeholder="0712345678"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 rounded-lg border bg-background min-h-[100px]"
              placeholder="Describe the water issue..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />

            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="mt-3 rounded-lg max-h-48 border"
              />
            )}
          </div>

          {/* GPS */}
          <div className="p-3 bg-secondary rounded-lg text-sm">
            {latitude && longitude ? (
              <p className="text-green-600 font-semibold">
                📍 Location Captured: {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </p>
            ) : (
              <p className="text-yellow-600">📍 Capturing GPS location...</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
