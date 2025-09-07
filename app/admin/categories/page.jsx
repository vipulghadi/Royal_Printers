"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", isActive: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories/";
      const method = editingCategory ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer admin-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      fetchCategories();
      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", isActive: true });
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, isActive: category.isActive });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer admin-token`,
        },
      });
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleImageDialog = (category) => {
    setSelectedCategory(category);
    setIsImageDialogOpen(true);
  };

  const handleImageUpload = async () => {
    if (!selectedCategory || !selectedCategory.imageFile) return;

    try {
      const formData = new FormData();
      formData.append("image", selectedCategory.imageFile);
      formData.append("categoryId", selectedCategory.id);

      const response = await fetch(`/api/category-images/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer admin-token",
        },
        body: formData,
      });

      if (response.ok) {
        fetchCategories();
        setIsImageDialogOpen(false);
        setSelectedCategory({ ...selectedCategory, imageFile: null });
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleImageDelete = async () => {
    if (!selectedCategory) return;

    try {
      await fetch(`/api/categories/${selectedCategory.id}/image`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin-token",
        },
      });
      fetchCategories();
      setIsImageDialogOpen(false);
      setSelectedCategory({ ...selectedCategory, imageFile: null });
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await fetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer admin-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...category, isActive: !category.isActive }),
      });
      fetchCategories();
    } catch (error) {
      console.error("Failed to toggle category status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading Categories…</span>
        </div>
      </div>
    );
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null);
                setFormData({ name: "", isActive: true });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Visiting Cards"
                  required
                />
              </div>
              <div>
                <Label htmlFor="isActive">Active Status</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingCategory ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
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
            {categories.map((category) => (
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
                    onCheckedChange={() => handleToggleActive(category)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleImageDialog(category)}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Category Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    imageFile: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleImageUpload}
                disabled={!selectedCategory?.imageFile}
              >
                Upload Image
              </Button>
              <Button
                variant="destructive"
                onClick={handleImageDelete}
                disabled={!selectedCategory?.images?.length}
              >
                Delete Image
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsImageDialogOpen(false);
                  setSelectedCategory(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
