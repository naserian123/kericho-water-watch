import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const uploadImage = async (file: File | null) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    // Upload image to the correct bucket
    const { data, error } = await supabase.storage
      .from("reports-images") // Make sure this bucket exists
      .upload(`images/${fileName}`, file);

    if (error) {
      console.error("Image upload error:", error.message);
      return null;
    }

    // Get the public URL (getPublicUrl is synchronous and doesn't return an error)
    const { data: publicUrlData } = supabase
      .storage
      .from("reports-images")
      .getPublicUrl(`images/${fileName}`);

    return publicUrlData.publicUrl;
  };

  const submitReport = async (event: React.FormEvent) => {
    event.preventDefault();

    const imageUrl = await uploadImage(selectedFile);

    const { error } = await supabase.from("reports").insert([
      {
        name,
        phone,
        email,
        description,
        image_url: imageUrl,
        latitude,
        longitude,
      },
    ]);

    if (error) {
      alert("Error submitting report");
      console.error(error);
      return;
    }

    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-xl mx-auto bg-card shadow-xl rounded-xl p-6 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Report Water Issue
        </h2>

        <form className="space-y-4" onSubmit={submitReport}>
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

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border bg-background"
              placeholder="example@gmail.com"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              required
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

          <div className="p-3 bg-secondary rounded-lg text-sm">
            {latitude && longitude ? (
              <p className="text-success font-semibold">
                📍 Location Captured: {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </p>
            ) : (
              <p className="text-warning">📍 Capturing GPS location...</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
