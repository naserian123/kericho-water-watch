import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();

  // 🌟 1. State variables
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  //  2. GPS CAPTURE — PLACE IT HERE
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  //  3. Upload image function
  const uploadImage = async (file: File | null) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("leak-images")
      .upload(fileName, file);

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("leak-images").getPublicUrl(fileName);

    return publicUrl;
  };

  //  4. Submit report function
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
    <form onSubmit={submitReport}>
      {/* your form inputs go here */}
    </form>
  );
};

export default Report;
