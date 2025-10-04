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

function CategorySaveUpdateDialog({
  isDialogOpen,
  setIsDialogOpen,
  category,
  createCategory,
  updateCategory,
}) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    isActive: true,
  });

  const isLoading = createCategory?.isLoading || updateCategory?.isLoading;

  // Load category when editing
  useEffect(() => {
    if (category) {
      setCategoryData({
        name: category.name || "",
        isActive: category.isActive ?? true,
      });
    } else {
      setCategoryData({ name: "", isActive: true });
    }
  }, [category]);

  const handleChange = (field, value) => {
    setCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (category?.id) {
      updateCategory.mutate(
        { id: category.id, data:categoryData },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            setIsDialogOpen(false);
          },
          onError: () => toast.error("Failed to update category"),
        }
      );
    } else {
      createCategory.mutate(categoryData, {
        onSuccess: () => {
          toast.success("Category created successfully");
          setIsDialogOpen(false);
        },
        onError: () => toast.error("Failed to create category"),
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Update Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label className="mb-1">Name</Label>
            <Input
              value={categoryData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center gap-2">
            <Switch
              checked={categoryData.isActive}
              onCheckedChange={(val) => handleChange("isActive", val)}
            />
            <Label>Active</Label>
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
                ? category
                  ? "Updating..."
                  : "Creating..."
                : category
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategorySaveUpdateDialog;
