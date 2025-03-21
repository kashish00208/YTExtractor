"use client";
import { useState } from "react";
import NavBar from "./NavBar";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!url) {
      setMessage("Provide a URL");
      return;
    }
    setMessage("");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.error || "Failed to download video"}`);
        return;
      }

      const data = await response.json();
      if (data.fileUrl) {
        setLoading(false);
        setUrl("");
      } else {
        setMessage("❌ Error while downloading video");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage("❌ An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-900 flex flex-col">
        <NavBar />
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <h1 className="text-white font-bold text-2xl mb-6">
            YouTube Video Downloader
          </h1>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <form onSubmit={handleInputChange} className="flex flex-col">
              <input
                type="text"
                value={url}
                className="border border-gray-600 rounded-md w-full p-3 bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the video URL"
              />
              <button
                disabled={loading}  
                className="rounded-md w-full bg-blue-500 text-white p-3 mt-4 font-semibold hover:bg-blue-600 transition-all"
                type="submit"
              >
                {loading?"Downloading the video":"Download video"}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center text-sm font-semibold ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
