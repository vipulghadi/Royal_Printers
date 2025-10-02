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
  Star,
  ImageIcon,
  Loader2,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useAdminProduct, useAdminProducts } from "@/hooks/admin/useAdminProducts";

export default function AdminProductDetailPage({ params }) {
  const router = useRouter();

  const productId= React.use(params).id;
  const {data:productData,isLoading:isProductLoading,isError}=useAdminProduct(productId)
  const product=productData?.data|| null;
  const [activeTab, setActiveTab] = useState("overview");
  const[productDialogOpen,setProductDialogOpen]=useState(false)
  const [productDetailData,setProductDetailData]=useState()
  const [productImagesData,setProductImagesData]=useState(null)
  const {images:productImages,attributes:productAttributes, ...productDetail}=product;

  console.log(images);
  












  return (
    <div className="space-y-6">


      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="flex flex-wrap ">
          <TabsTrigger value="overview" className="font-semibold">Overview</TabsTrigger>
          <TabsTrigger value="images" className="font-semibold">Images</TabsTrigger>
          <TabsTrigger value="attributes" className="font-semibold">Attributes</TabsTrigger>
        </TabsList>

<TabsContent value="overview" className="space-y-6">
  <div className="grid sm:grid-cols-2  w-full  h-[80vh] ">
    {/* Left Side: Product Image */}
    <div className="w-full h-full   overflow-hidden   bg-gray-100">
      <img
        src={
            product?.images?.[0]||
          "/imageNotFound.png"
        }
    alt={product?.name|| "Unamed"}
        className=" object-cover h-full w-full "
      />
    </div>

    {/* Right Side: Product Info */}

<div className=" items-start mt-6 md:mt-0 px-6 py-2 space-y-6 w-full ">
<div className="flex items-center justify-between">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            {product?.name||"Not Found"}
          </h1>
          <Button className="bg-green-500 rounded-full">Active</Button>
</div>

                    <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
        {product?.description|| "No desc"}
          </p>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-6">
            ₹{product?.basePrice|| 0}
          </div>
          <div>
                <span className="font-semibold">color: </span>
                <span>red, green, pink</span>
          </div>
          <div className="flex w-full gap-1 ">
            <Button className="w-1/2"
            onClick={()=>{
                setProductDialogOpen(true);
                setProductDetailData(product)

            }}
            >Update</Button>
            <Button className="w-1/2 bg-red-500 hover:bg-red-600">Delete</Button>
          </div>
</div>

  </div>
</TabsContent>



      </Tabs>

    </div>
  );
}
