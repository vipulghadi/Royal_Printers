import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const FileUpload = ({ onFileSelect, accept = "image/*" }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // When user clicks on the logo
  const handleLogoClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  // When user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setSelectedFile(file);
    e.target.value = null; // reset input
  };

  // When user clicks Upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      await onFileSelect(selectedFile); // parent callback
    
      setSelectedFile(null); // reset after upload
    } catch (err) {
        console.log(err);
        
    
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Logo / Preview */}
      <div
        className="w-64 h-64 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleLogoClick}
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Click to select</span>
        )}
      </div>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        style={{ display: "none" }}
      />

      {/* Upload Button */}
      <Button
        type="button"
        onClick={handleUpload}
        className="px-4 py-2 text-white rounded-lg hover:bg-green-600 transition"
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
