"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  BadgeIndianRupee,
  Check,
  Edit2,
  ImageIcon,
  Loader2,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";

export default function AdminProductDetailPage({ params }) {
  const router = useRouter();

  const routeId = React.use(params).id;
  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productAttributes, setProductAllAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [selectedAttributeData, setSelectedAttributeData] = useState({
    attribute: null,
    option: null,
    price: 0,
  });

  const [editAttributeDialogOpen, setEditAttributeDialogOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);

  const fileInputRef = useRef(null);
  // dialogs
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [imagesDialogOpen, setImagesDialogOpen] = useState(false);
  const [attributesDialogOpen, setAttributesDialogOpen] = useState(false);

  // Edit form states
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "",
    isActive: true,
    isTrending: false,
    isNew: false,
    isFeatured: false,
  });

  const currentAttr = attributes.find(
    (attr) => attr.id === selectedAttributeData.attribute?.id
  );

  const fetchProductData = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/products/${routeId}`
      );
      const data = await result.json();
      setProduct(data.data);
      setFormData({
        name: data.data.name || "",
        description: data.data.description || "",
        basePrice: data.data.basePrice?.toString?.() || "",
        categoryId: data.data.categoryId?.toString?.() || "",
        isActive: !!data.data.isActive,
        isTrending: !!data.data.isTrending,
        isNew: !!data.data.isNew,
        isFeatured: !!data.data.isFeatured,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductImages = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/product-images/?productId=${routeId}`
      );
      const data = await result.json();
      setProductImages(data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/categories`);
      const data = await result.json();
      setCategories(data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttributes = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/attributes?includeOptions=true`
      );
      const data = await result.json();
      setAttributes(data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductAttributes = async () => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/product-attributes/?productId=${routeId}`
      );
      const data = await result.json();
      setProductAllAttributes(data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchProductImages();
    fetchCategories();
    fetchAttributes();
    fetchProductAttributes();
  }, [routeId]);

  // Handlers: product
  const handleSaveProduct = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    try {
      const next = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        basePrice: Number(formData.basePrice) || 0,
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        isActive: !!formData.isActive,
        isTrending: !!formData.isTrending,
        isNew: !!formData.isNew,
        isFeatured: !!formData.isFeatured,
      };
      fetch(`http://localhost:3000/api/products/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer admin-token",
        },
        body: JSON.stringify(next),
      });

      setDetailsDialogOpen(false);
      fetchProductData();
      toast.success("Product details saved");
    } catch (err) {
      toast.error(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await fetch(`http://localhost:3000/api/product-images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer admin-token" },
      });
      setProductImages((imgs) => imgs.filter((img) => img.id !== imageId));
      toast.success("Image deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete image");
    }
  };

  const handleUploadProductImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("productId", routeId);
    formData.append("imageFile", file);
    try {
      const res = await fetch(`http://localhost:3000/api/product-images`, {
        method: "POST",
        headers: {
          Authorization: "Bearer admin-token",
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProductImages((imgs) => [data.data, ...imgs]);
        toast.success("Image uploaded");
      } else {
        toast.error(data.message || "Failed to upload image");
      }
    } catch (err) {
      toast.error(err.message || "Failed to upload image");
    }
  };

  const handleAttributeDataSubmit = async () => {
    if (!selectedAttributeData) {
      toast.error("Invalid data");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/product-attributes",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer admin-token",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: parseInt(routeId),
            attributeId: selectedAttributeData.attribute.id,
            attributeOptionId: selectedAttributeData.option.id,
            priceAdjustment: parseFloat(selectedAttributeData.price),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchProductAttributes();
        setAttributesDialogOpen(false);
        toast.success("Attribute added");
      } else {
        toast.error(data.message || "Failed to add attribute");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to add attribute");
    }
  };

  const handleUpdateAttribute = async () => {
    if (!editingAttribute) {
      toast.error("Invalid data");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/product-attributes/${editingAttribute.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer admin-token",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: parseInt(routeId),
            attributeId: editingAttribute.attribute.id,
            attributeOptionId: editingAttribute.option.id,
            priceAdjustment: parseFloat(editingAttribute.price),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchProductAttributes();
        setEditAttributeDialogOpen(false);
        toast.success("Attribute updated");
      } else {
        toast.error(data.message || "Failed to update attribute");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update attribute");
    }
  };

  const handleDeleteAttribute = async (attributeId) => {
    if (!confirm("Are you sure you want to delete this attribute?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/product-attributes/${attributeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer admin-token",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchProductAttributes();
        toast.success("Attribute deleted");
      } else {
        toast.error(data.message || "Failed to delete attribute");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to delete attribute");
    }
  };

  // Handlers: attributes
  const basePrice = useMemo(
    () => Number(product?.basePrice || 0),
    [product?.basePrice]
  );

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading product…</span>
        </div>
      </div>
    );
  }

  if (!loading && !product) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="rounded-2xl p-8 flex flex-col items-center space-y-6 max-w-md w-full text-center">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/admin/products")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Product not found</h1>
          </div>
          <p className="text-gray-600">
            The product you are looking for does not exist or may have been
            removed.
          </p>
          <Button
            onClick={() => router.push("/admin/products")}
            className="w-full"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"></div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6 w-full sm:h-[60vh] h-auto">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://plus.unsplash.com/premium_photo-1755882951316-b2580ee52cd0?q=80&w=425&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
                  <Label className="text-gray-500 text-sm">Base Price</Label>
                  <div className="text-lg font-semibold">
                    ₹{Number(product.basePrice).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
                  <Label className="text-gray-500 text-sm">Category</Label>
                  <div className="text-lg font-medium">
                    {product.category?.name || "-"}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl shadow-sm space-y-2">
                <Label className="text-gray-500 text-sm">Highlights</Label>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isTrending
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    🔥 Trending
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isNew
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    🆕 New
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isFeatured
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    ⭐ Featured
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Description</Label>
                <p className="mt-2 text-gray-700 text-base leading-relaxed">
                  {product.description || "-"}
                </p>
              </div>
              <div className="flex justify-end border-t pt-4">
                <Button
                  onClick={() => setDetailsDialogOpen(true)}
                  className="rounded-xl shadow bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Details
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <div className="w-full">
            <div className="flex items-center mb-2 justify-end">
              <Button
                type="button"
                className="flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUploadProductImage(file);
                    }
                  }}
                />
              </Button>
            </div>
            {productImages.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                No images yet. Click Manage Images to add.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-lg overflow-hidden border group"
                  >
                    <img
                      src={
                        img.url ||
                        "/placeholder.svg?height=300&width=300&query=product%20image"
                      }
                      alt={`Image ${img.id}`}
                      className="h-40 w-full object-cover"
                    />
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="attributes" className="space-y-4">
          <Card className="shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setAttributesDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Attribute
              </Button>
            </CardHeader>
            <CardContent>
              {productAttributes.length === 0 ? (
                <p className="text-center text-gray-500">
                  No product attributes assigned
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Price Adjustment</TableHead>
                      <TableHead>Final Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productAttributes.map((row) => {
                      const adjustment = Number(row.priceAdjustment || 0);
                      const finalPrice = basePrice + adjustment;
                      return (
                        <TableRow key={row.id}>
                          <TableCell className="font-medium">
                            {row.attributeName}
                          </TableCell>
                          <TableCell>{row.optionValue}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <BadgeIndianRupee className="h-4 w-4" />
                              <Input
                                className="w-24"
                                value={adjustment}
                                type="number"
                                step="0.01"
                                disabled
                              />
                            </div>
                          </TableCell>
                          <TableCell>₹{finalPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setEditingAttribute({
                                    id: row.id,
                                    attribute: {
                                      id: row.attributeId,
                                      name: row.attributeName,
                                    },
                                    option: {
                                      id: row.attributeOptionId,
                                      value: row.optionValue,
                                    },
                                    price: row.priceAdjustment,
                                  });
                                  setEditAttributeDialogOpen(true);
                                }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteAttribute(row.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product Details</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSaveProduct}
            className="space-y-6"
            aria-label="Edit product details form"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="e.g., Premium Visiting Cards"
                  required
                />
              </div>
              <div>
                <Label htmlFor="basePrice">Base Price (₹)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, basePrice: e.target.value }))
                  }
                  placeholder="199.00"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="categoryId">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData((s) => ({ ...s, categoryId: value }))
                }
              >
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2">Status & Highlights</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData((s) => ({ ...s, isActive: e.target.checked }))
                    }
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isTrending"
                    checked={formData.isTrending}
                    onChange={(e) =>
                      setFormData((s) => ({
                        ...s,
                        isTrending: e.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="isTrending">Trending</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={(e) =>
                      setFormData((s) => ({ ...s, isNew: e.target.checked }))
                    }
                  />
                  <Label htmlFor="isNew">New</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData((s) => ({
                        ...s,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, description: e.target.value }))
                }
                placeholder="Detailed product description..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDetailsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={imagesDialogOpen} onOpenChange={setImagesDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <Button>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {productImages.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                No images yet. Add one above.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productImages.map((img) => (
                  <Card key={img.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={
                          img.url ||
                          "/placeholder.svg?height=300&width=300&query=product%20image"
                        }
                        alt={`Product image ${img.id}`}
                        className="h-40 w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={() => handleDeleteImage(img.id)}
                        aria-label="Delete image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={attributesDialogOpen}
        onOpenChange={setAttributesDialogOpen}
        className="w-full"
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Attribute</DialogTitle>
          </DialogHeader>
          <form
            className="grid grid-cols-2 gap-4 items-center justify-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleAttributeDataSubmit();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>Select Attribute</Label>
              <Select
                value={selectedAttributeData.attribute?.name || ""}
                onValueChange={(val) => {
                  const attr = attributes.find((a) => a.name === val);
                  if (attr) {
                    setSelectedAttributeData({
                      ...selectedAttributeData,
                      attribute: { id: attr.id, name: attr.name },
                      option: null,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Attribute" />
                </SelectTrigger>
                <SelectContent>
                  {attributes.map((attr) => (
                    <SelectItem key={attr.id} value={attr.name}>
                      {attr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Select Option</Label>
              <Select
                value={selectedAttributeData.option?.value || ""}
                onValueChange={(val) => {
                  const opt = currentAttr?.options.find((o) => o.value === val);
                  if (opt) {
                    setSelectedAttributeData({
                      ...selectedAttributeData,
                      option: { id: opt.id, value: opt.value },
                    });
                  }
                }}
                disabled={!currentAttr}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Option" />
                </SelectTrigger>
                <SelectContent>
                  {currentAttr?.options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.value}>
                      {opt.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Price Adjustment (₹)</Label>
              <Input
                type="number"
                value={selectedAttributeData.price}
                onChange={(e) =>
                  setSelectedAttributeData({
                    ...selectedAttributeData,
                    price: e.target.value,
                  })
                }
                className="w-40"
                placeholder="Enter price"
              />
            </div>
            <Button type="submit" className="self-end">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editAttributeDialogOpen}
        onOpenChange={setEditAttributeDialogOpen}
        className="w-full"
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Attribute</DialogTitle>
          </DialogHeader>
          <form
            className="grid grid-cols-2 gap-4 items-center justify-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateAttribute();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>Select Attribute</Label>
              <Select
                value={editingAttribute?.attribute?.name || ""}
                onValueChange={(val) => {
                  const attr = attributes.find((a) => a.name === val);
                  if (attr) {
                    setEditingAttribute({
                      ...editingAttribute,
                      attribute: { id: attr.id, name: attr.name },
                      option: null,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Attribute" />
                </SelectTrigger>
                <SelectContent>
                  {attributes.map((attr) => (
                    <SelectItem key={attr.id} value={attr.name}>
                      {attr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Select Option</Label>
              <Select
                value={editingAttribute?.option?.value || ""}
                onValueChange={(val) => {
                  const currentEditAttr = attributes.find(
                    (a) => a.id === editingAttribute.attribute.id
                  );
                  const opt = currentEditAttr?.options.find(
                    (o) => o.value === val
                  );
                  if (opt) {
                    setEditingAttribute({
                      ...editingAttribute,
                      option: { id: opt.id, value: opt.value },
                    });
                  }
                }}
                disabled={!editingAttribute?.attribute}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Option" />
                </SelectTrigger>
                <SelectContent>
                  {attributes
                    .find((a) => a.id === editingAttribute?.attribute?.id)
                    ?.options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.value}>
                        {opt.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Price Adjustment (₹)</Label>
              <Input
                type="number"
                value={editingAttribute?.price || ""}
                onChange={(e) =>
                  setEditingAttribute({
                    ...editingAttribute,
                    price: e.target.value,
                  })
                }
                className="w-40"
                placeholder="Enter price"
              />
            </div>
            <Button type="submit" className="self-end">
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
