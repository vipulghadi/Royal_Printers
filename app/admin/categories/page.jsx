"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ImageIcon, X } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [categoryImages, setCategoryImages] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({ name: "", slug: "" })
  const [newImageUrl, setNewImageUrl] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories?includeImages=true")
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const fetchCategoryImages = async (categoryId) => {
    try {
      const res = await fetch(`/api/admin/categories/${categoryId}/images`)
      const data = await res.json()
      setCategoryImages(data.images || [])
    } catch (error) {
      console.error("Failed to fetch category images:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories"
      const method = editingCategory ? "PUT" : "POST"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      fetchCategories()
      setIsDialogOpen(false)
      setEditingCategory(null)
      setFormData({ name: "", slug: "" })
    } catch (error) {
      console.error("Failed to save category:", error)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({ name: category.name, slug: category.slug })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      fetchCategories()
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const openImagesDialog = (category) => {
    setSelectedCategory(category)
    fetchCategoryImages(category.id)
    setIsImagesDialogOpen(true)
  }

  const addCategoryImage = async () => {
    if (!newImageUrl.trim() || !selectedCategory) return

    try {
      await fetch(`/api/admin/categories/${selectedCategory.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newImageUrl }),
      })

      fetchCategoryImages(selectedCategory.id)
      setNewImageUrl("")
    } catch (error) {
      console.error("Failed to add image:", error)
    }
  }

  const deleteCategoryImage = async (imageId) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      await fetch(`/api/admin/categories/images/${imageId}`, { method: "DELETE" })
      fetchCategoryImages(selectedCategory.id)
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage product categories with images and slugs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null)
                setFormData({ name: "", slug: "" })
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Visiting Cards"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL-friendly)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., visiting-cards"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave empty to auto-generate from name</p>
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingCategory ? "Update" : "Create"}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              {category.images && category.images.length > 0 ? (
                <img
                  src={category.images[0].url || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              {category.images && category.images.length > 1 && (
                <Badge className="absolute top-2 right-2 bg-black/70">+{category.images.length - 1}</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">/{category.slug}</p>
                  <p className="text-xs text-muted-foreground">{category._count?.products || 0} products</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(category)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => openImagesDialog(category)}>
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="font-mono text-sm">/{category.slug}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openImagesDialog(category)}>
                      <ImageIcon className="w-4 h-4 mr-1" />
                      {category.images?.length || 0} images
                    </Button>
                  </TableCell>
                  <TableCell>{category._count?.products || 0}</TableCell>
                  <TableCell>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => openImagesDialog(category)}>
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Images Dialog */}
      <Dialog open={isImagesDialogOpen} onOpenChange={setIsImagesDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Category Images - {selectedCategory?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add New Image */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addCategoryImage}>Add Image</Button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`${selectedCategory?.name} image`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => deleteCategoryImage(image.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {categoryImages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No images added yet. Add some images to showcase this category.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
