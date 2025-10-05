"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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
import { Edit, Loader2, Trash2 } from "lucide-react";
import {
  useAdminProduct,
  useAdminProductMutation,
  useAdminProducts,
} from "@/hooks/admin/useAdminProducts";
import ProductSaveUpdateDialog from "@/components/admin/dialogs/productSaveUpdateDialog";
import FileUploadDialog from "@/components/shared/dialog/fileUploadDialog";
import { useAdminProductImageMutation } from "@/hooks/admin/useAdminProductImages";
import ProductAttributeSaveUpdateDialog from "@/components/admin/dialogs/productAttributeSaveUpdate";
import { useAdminProductAttributesMutation } from "@/hooks/admin/useAdminProductAttributes";
import { CustomBreadcrumb } from "@/components/shared/customBreadCrumb";

export default function AdminProductDetailPage({ params }) {
  const productId = React.use(params).id;
  const { data, isLoading, isError, refetch } = useAdminProduct(productId);
  const { createProductImage, deleteProductImage } =
    useAdminProductImageMutation();
  const { createProduct, updateProduct } = useAdminProductMutation();
  const {
    createProductAttribute,
    updateProductAttribute,
    deleteProductAttribute,
  } = useAdminProductAttributesMutation();
  const product = data?.data || null;
  const [activeTab, setActiveTab] = useState("overview");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isImageUploadDialogOpen, setIsImageUploadDialogOpen] = useState(false);
  const [isProductAttributeDialogOpen, setIsProductAttributeDialogOpen] =
    useState(false);
  const [productImagesData, setProductImagesData] = useState([]);
  const [productAttrData, setProductAttrData] = useState([]);
  const [selectedProductAttribute, setSelectedProductAttribute] =
    useState(null);

  useEffect(() => {
    setProductImagesData(product?.images);
    setProductAttrData(product?.attributes);
    delete product?.images;
    delete product?.attributes;
    console.log("product is", product);
  }, [product]);

  console.log(productImagesData);

  async function handleImageFileUpload(formData) {
    const newFormData = new FormData();

    newFormData.append("productId", product.id);
    newFormData.append("imageFile", formData.get("files"));

    createProductImage.mutate(newFormData, {
      onSuccess: () => {
        toast.success("image  added successfully");
        setIsImageUploadDialogOpen(false);
        refetch();
      },
      onError: (error) => toast.error(error.message || "faild to add image"),
    });
  }

  function handleDeleteImage(id) {
    deleteProductImage.mutate(id, {
      onSuccess: () => {
        toast.success("Image deleted successfully");
        refetch();
      },
      onError: (error) => {
        console.error("Delete failed:", error);
        toast.error("Failed to delete image");
      },
    });
  }

  function handleDeleteProductAttr(id) {
    deleteProductAttribute.mutate(id, {
      onSuccess: () => {
        toast.success("product deleted successfully");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message || "Error  in deleting attribute");
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }
  console.log(product,"aesdgfh");
  
  return (
    <div className="space-y-6">
      <CustomBreadcrumb
        data={[
          { title: "Dashboard", link: "/admin/" },
          { title: "products", link: "/admin/products/" },
          { title: "Red T-Shirt" },
        ]}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="flex flex-wrap ">
          <TabsTrigger value="overview" className="font-semibold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="images" className="font-semibold">
            Images
          </TabsTrigger>
          <TabsTrigger value="attributes" className="font-semibold">
            Attributes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid sm:grid-cols-2  w-full  h-[80vh] ">
            {/* Left Side: Product Image */}
            <div className="w-full h-full   overflow-hidden   bg-gray-100">
              <img
                src={
                  (productImagesData &&
                    productImagesData.length >= 0 &&
                    productImagesData?.[0]?.url) ||
                  "/imageNotFound.png"
                }
                alt={product?.name || "Unamed"}
                className=" object-cover h-full w-full "
              />
            </div>

            {/* Right Side: Product Info */}

<div className="items-start mt-6 md:mt-0 px-6 py-2 space-y-6 w-full">
  {/* Title & Status */}
  <div className="flex items-center justify-between">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
      {product?.name || "Not Found"}
    </h1>
    <Button
      className={`rounded-full ${
        product?.isActive ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      {product?.isActive ? "Active" : "Inactive"}
    </Button>
  </div>

  {/* Description */}
  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
    {product?.description || "No description"}
  </p>

  {/* Price */}
  <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-6">
    ₹{product?.basePrice || 0}
  </div>

  {/* Product Flags */}
 
  <div className="flex flex-wrap gap-2 ">
    {product?.isTrending && (
      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
        Trending
      </span>
    )}
    {product?.isNew && (
      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
        New
      </span>
    )}
    {product?.isFeatured && (
      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
        Featured
      </span>
    )}
  </div>

  {/* Actions */}
  <div className="flex w-full gap-2 mt-4">
    <Button
      className="w-1/2"
      onClick={() => {
        setIsProductDialogOpen(true);
      }}
    >
      Update
    </Button>
    <Button className="w-1/2 bg-red-500 hover:bg-red-600">Delete</Button>
  </div>
</div>



          </div>
        </TabsContent>

        <TabsContent value="images">
          <div className="flex justify-end">
            <Button
              className=""
              onClick={() => {
                setIsImageUploadDialogOpen(true);
              }}
            >
              Add Product Image
            </Button>
          </div>

          <div className="w-full grid grid-cols-4 gap-4">
            {productImagesData &&
              productImagesData.map((img) => {
                return (
                  <div className=" relative col-span-1 bg-gray-200  rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={img.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <Button
                      className="absolute top-0 right-0"
                      onClick={() => {
                        handleDeleteImage(img.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="attributes">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => {
                setIsProductAttributeDialogOpen(true);
              }}
            >
              Add Product Attribute
            </Button>
          </div>

          {/* Attributes Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Option</TableHead>
                <TableHead>Price Adjustment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex h-[70vh] w-full items-center justify-center">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading attributes…</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex h-[70vh] w-full items-center justify-center text-red-500">
                      Failed to load attributes. Please try again.
                    </div>
                  </td>
                </tr>
              ) : productAttrData && productAttrData.length > 0 ? (
                productAttrData.map((attr) => (
                  <TableRow key={attr.id}>
                    <TableCell className="font-medium">
                      {attr.attribute?.name || "-"}
                    </TableCell>
                    <TableCell>{attr.attributeOption?.value || "-"}</TableCell>
                    <TableCell>
                      {attr.priceAdjustment ? `+₹${attr.priceAdjustment}` : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={attr.isActive}
                          onCheckedChange={(value) =>
                            handleToggleStatus(attr.id, value)
                          }
                        />
                        <span>{attr.isActive ? "Active" : "Inactive"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedProductAttribute(attr);
                            setIsProductAttributeDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleDeleteProductAttr(attr.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="flex h-[70vh] w-full items-center justify-center text-muted-foreground">
                      No attributes found.
                    </div>
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <ProductSaveUpdateDialog
        isDialogOpen={isProductDialogOpen}
        setIsDialogOpen={setIsProductDialogOpen}
        selectedProduct={product}
        createProduct={createProduct}
        updateProduct={updateProduct}
        refetch={refetch}
      />
      <FileUploadDialog
        isDialogOpen={isImageUploadDialogOpen}
        setIsDialogOpen={setIsImageUploadDialogOpen}
        onUpload={(formData) => {
          handleImageFileUpload(formData);
        }}
        accept={"image/*"}
        multiple={false}
        title={"Upload product Image"}
      />

      <ProductAttributeSaveUpdateDialog
        setIsProductAttributeDialogOpen={setIsProductAttributeDialogOpen}
        isProductAttributeDialogOpen={isProductAttributeDialogOpen}
        createProductAttribute={createProductAttribute}
        updateProductAttribute={updateProductAttribute}
        selectedProductAttribute={null}
        productId={product.id}
        refetch={refetch}
      />
    </div>
  );
}
