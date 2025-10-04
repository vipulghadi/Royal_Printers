import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import FileUpload from '@/components/shared/fileUpload'
import { useEffect } from 'react'
import axios from 'axios'
import { adminAPI } from '@/lib/api'
import { toast } from 'react-hot-toast'

function CategoryImageDialog({
    selectedCategory, 
    isDialogOpen, 
    setIsDialogOpen,
onImageUploadSuccess}) {
 console.log("Selected Cat in dialog",selectedCategory);
 

const handleImageUpload = async (file) => {
  try {
    console.log("In API",file);
    
    const formData = new FormData();
    formData.append("image", file);
    formData.append("categoryId", selectedCategory.id);
    const response=adminAPI("/api/admin/category-images/",{
        method: "POST", body: formData
    })
    

    toast.success("Image uploaded successfully");
    onImageUploadSuccess?.(); // trigger refetch in parent
    setIsDialogOpen(false);
  } catch (err) {
    toast.error(err.message || "Upload failed");
  }
};



    
  return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogTitle className="font-semibold">
         Upload Category Image
        </DialogTitle>
<FileUpload  label = "Upload Category Image"  onFileSelect={handleImageUpload} accept = {"image/*"} multiple = {false} />

      </DialogContent>
    </Dialog>
  )
}

export default CategoryImageDialog