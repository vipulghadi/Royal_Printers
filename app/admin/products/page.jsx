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
import ProductCard from "@/components/client/productCard";
import { useAdminProductMutation, useAdminProducts } from "@/hooks/admin/useAdminProducts";
import AdminProductCard from "@/components/admin/product/adminProductCard";
import ProductSaveUpdateDialog from "@/components/admin/dialogs/productSaveUpdateDialog";

export default function ProductPage() {

const { data, isLoading, isError, refetch } = useAdminProducts();
const{createProduct,updateProduct,deleteProduct}=useAdminProductMutation();
const products = data?.data?.data || [];
console.log(products);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);


if(isLoading){
  return (
    <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
    </div>
    )
}

if(isError){
  return (
    <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Failed to load products. Please try again.</p>
    </div>
    )
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
        <Button  onClick={()=>{
            setIsProductDialogOpen(true)
            setSelectedProduct(null)
          }}>
          <Plus className="w-4 h-4 mr-2" 

           /> Create New Product
        </Button>
      </div>

      



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          products?.map((product) => (
<AdminProductCard product={product} />
          ))
        )}
      </div>



<ProductSaveUpdateDialog
isDialogOpen={isProductDialogOpen}
setIsDialogOpen={setIsProductDialogOpen}
selectedProduct={selectedProduct}
createProduct={createProduct}
updateProduct={updateProduct}

/>
    </div>
  );
}
