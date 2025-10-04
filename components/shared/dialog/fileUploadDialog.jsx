import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { UploadCloud } from "lucide-react"; // icon

function FileUploadDialog({
  isDialogOpen,
  setIsDialogOpen,
  onUpload,
  title = "Upload File",
  accept = "*/*",
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5 MB default
}) {
  const [files, setFiles] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const selected = e.target.files;

    for (const file of selected) {
      if (file.size > maxSize) {
        toast.error(
          `File ${file.name} exceeds max size of ${maxSize / 1024 / 1024} MB`
        );
        return;
      }
    }

    setFiles(selected);
  };

const handleSubmit = () => {
  console.log(files[0]);

  if (!files || files.length === 0) {
    toast.error("Please select a file first");
    return;
  }

  const formData = new FormData();
  if(multiple){
  formData.append("files", files);
  }
  else{
      formData.append("files", files[0]);
  }


  // ✅ Inspect the content


  onUpload(formData);
  setFiles(null);
};


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition"
          >
            <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
            <p className="text-gray-600 text-sm font-medium">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-400">
              {multiple ? "Multiple files allowed" : "Single file only"}
            </p>
          </div>

          {/* Preview if images */}
          {files && accept.includes("image") && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from(files).map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded shadow"
                />
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Upload</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FileUploadDialog;
