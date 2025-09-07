"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Settings,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Image,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "",
    isTrending: false,
    isNew: false,
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/products?page=${page}&limit=${productsPerPage}`
      );
      const data = await res.json();
      setProducts(data.data.data || []);
      setTotalProducts(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/categories/`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer admin-token`,
        },
        body: JSON.stringify({
          ...productFormData,
          basePrice: parseFloat(productFormData.basePrice),
          categoryId: parseInt(productFormData.categoryId),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create product");
      toast.success("Product created successfully");
      fetchProducts(currentPage);
      setIsCreateDialogOpen(false);
      setProductFormData({
        name: "",
        slug: "",
        description: "",
        basePrice: "",
        categoryId: "",
        isTrending: false,
        isNew: false,
        isFeatured: false,
        isActive: true,
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error(error.message || "Failed to create product");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage(page);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading products…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
            Products
          </h1>
          <p className="text-gray-500 sm:block hidden">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Create New Product
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8 border-gray-300 focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-2.5 top-2.5"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              onClick={() => {
                router.push(`/admin/products/${product.id}`);
              }}
            >
              <div className="relative">
                <img
                  src={
                    product.images[0]?.url || "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {product.isTrending && (
                    <Badge className="bg-blue-500 text-white">Trending</Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">New</Badge>
                  )}
                  {product.isFeatured && (
                    <Badge className="bg-yellow-500 text-white">Featured</Badge>
                  )}
                  {!product.isActive && (
                    <Badge className="bg-red-500 text-white">Inactive</Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-blue-600">
                    ${product.basePrice}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Category: {product.category?.name || "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-gray-300 text-gray-700 hover:bg-blue-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        <span className="text-gray-600">
          {currentPage} of {Math.ceil(totalProducts / productsPerPage)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
          className="border-gray-300 text-gray-700 hover:bg-blue-50"
        >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Create Product Modal */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={productFormData.name}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={productFormData.description}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                value={productFormData.basePrice}
                onChange={(e) =>
                  setProductFormData({
                    ...productFormData,
                    basePrice: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select
                value={productFormData.categoryId}
                onValueChange={(value) =>
                  setProductFormData({ ...productFormData, categoryId: value })
                }
              >
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isTrending"
                  checked={productFormData.isTrending}
                  onCheckedChange={(checked) =>
                    setProductFormData({
                      ...productFormData,
                      isTrending: checked,
                    })
                  }
                />
                <Label htmlFor="isTrending">Trending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isNew"
                  checked={productFormData.isNew}
                  onCheckedChange={(checked) =>
                    setProductFormData({
                      ...productFormData,
                      isNew: checked,
                    })
                  }
                />
                <Label htmlFor="isNew">New</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={productFormData.isFeatured}
                  onCheckedChange={(checked) =>
                    setProductFormData({
                      ...productFormData,
                      isFeatured: checked,
                    })
                  }
                />
                <Label htmlFor="isFeatured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={productFormData.isActive}
                  onCheckedChange={(checked) =>
                    setProductFormData({
                      ...productFormData,
                      isActive: checked,
                    })
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Create</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
