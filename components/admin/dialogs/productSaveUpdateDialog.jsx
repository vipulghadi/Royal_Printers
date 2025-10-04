import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import { useAdminCategories } from "@/hooks/admin/useAdminCategories";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductSaveUpdateDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedProduct,
  createProduct,
  updateProduct,
  refetch
}) {
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    description: "",
    basePrice: 0,
    categoryId: null,
    isTrending: false,
    isNew: false,
    isFeatured: false,
    isActive: true,
  });

  const {data}=useAdminCategories();
  const categories = data?.data || [];

  const isLoading = createProduct?.isLoading || updateProduct?.isLoading;

  // Load product if editing
  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name || "",
        slug: selectedProduct.slug || "",
        description: selectedProduct.description || "",
        basePrice: selectedProduct.basePrice || 0,
        categoryId: selectedProduct.categoryId || null,
        isTrending: selectedProduct.isTrending ?? false,
        isNew: selectedProduct.isNew ?? false,
        isFeatured: selectedProduct.isFeatured ?? false,
        isActive: selectedProduct.isActive ?? true,
      });
    } else {
      setProductData({
        name: "",
        slug: "",
        description: "",
        basePrice: 0,
        categoryId: null,
        isTrending: false,
        isNew: false,
        isFeatured: false,
        isActive: true,
      });
    }
  }, [selectedProduct]);

  const handleChange = (field, value) => {
    console.log(value);
    
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (selectedProduct) {
      updateProduct.mutate(
        { id: selectedProduct.id, data:productData },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            setIsDialogOpen(false);
            refetch()
          },
          onError: (error) => {
    console.log(error.message);
    
            
            toast.error(error?.message||"Fail to create product...");
            
            },
        }
      );
    } else {
        console.log(productData);
        
      createProduct.mutate(productData, {
        onSuccess: () => {
          toast.success("Product created successfully");
          setIsDialogOpen(false);
        },
        onError: () => toast.error("Failed to create product"),
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? "Update Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label className="mb-1">Name</Label>
            <Input
              value={productData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1">Category</Label>
                        <Select
              value={productData.categoryId?.toString() || ""}
              onValueChange={(val) =>
                setProductData({ ...productData, categoryId: parseInt(val) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>



          {/* Description */}
          <div>
            <Label className="mb-1">Description</Label>
            <Input
              value={productData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Base Price */}
          <div>
            <Label className="mb-1">Base Price</Label>
            <Input
              type="number"
              value={Number(productData.basePrice)}
              onChange={(e) => handleChange("basePrice",Number(e.target.value))}
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={productData.isActive}
                onCheckedChange={(val) => handleChange("isActive", val)}
              />
              <Label>Active</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={productData.isTrending}
                onCheckedChange={(val) => handleChange("isTrending", val)}
              />
              <Label>Trending</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={productData.isNew}
                onCheckedChange={(val) => handleChange("isNew", val)}
              />
              <Label>New</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={productData.isFeatured}
                onCheckedChange={(val) => handleChange("isFeatured", val)}
              />
              <Label>Featured</Label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? selectedProduct
                  ? "Updating..."
                  : "Creating..."
                : selectedProduct
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductSaveUpdateDialog;
