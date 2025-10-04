"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, ImageIcon, Loader2 } from "lucide-react";
import ProductSaveUpdateDialog from "@/components/admin/dialogs/productSaveUpdateDialog";
import { useAdminCategories, useAdminCategoryMutation } from "@/hooks/admin/useAdminCategories";
import { toast } from "react-hot-toast";
import CategoryImageDialog from "@/components/admin/dialogs/CategoryImageDialog";
import CategorySaveUpdateDialog from "@/components/admin/dialogs/categorySaveUpdateDialog";

export default function CategoriesPage() {
 
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  const{data, isLoading, refetch}= useAdminCategories();
  const{createCategory, updateCategory, deleteCategory, toggleCategoryActive}= useAdminCategoryMutation();
  


const handleCategoryDelete = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    deleteCategory.mutate(id, {
        onSuccess: () => {
            toast.success("Category deleted successfully");
            refetch();
        },
        onError: (err) => toast.error(err.message || "Something went wrong"),
    });
  }
}


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground sm:block hidden">
            Manage product categories with images and status
          </p>
        </div>
        <Button
            onClick={() => {
                setSelectedCategory(null);
                setIsCategoryDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>

        <CategorySaveUpdateDialog
          isDialogOpen={isCategoryDialogOpen}
          setIsDialogOpen={setIsCategoryDialogOpen}
          category={selectedCategory}
          createCategory={createCategory}
          updateCategory={updateCategory}
         
          />
          <CategoryImageDialog
           isDialogOpen={isImageDialogOpen} 
           setIsDialogOpen={setIsImageDialogOpen} 
           selectedCategory={selectedCategory}
           onImageUploadSuccess={() => refetch()}/>
        
      </div>
      {isLoading?      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading Categories…</span>
        </div>
      </div>: <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="w-[100px] h-[60px] relative">
                    {category.images && category.images.length > 0 ? (
                      <img
                        src={category.images[0].url || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted rounded">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category._count?.products || 0}</TableCell>
                <TableCell>
                  <Switch
                    checked={category.isActive}
                    
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCategoryDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>{
                        setIsImageDialogOpen(true)
                        setSelectedCategory(category)}}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>}




    </div>
  );
}
