import React, { useState, useEffect } from "react";
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
import { useAdminAttributes } from "@/hooks/admin/useAdminAttributes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductAttributeSaveUpdateDialog({
  isProductAttributeDialogOpen,
  setIsProductAttributeDialogOpen,
  selectedProductAttribute,
  createProductAttribute,
  updateProductAttribute,
  productId,refetch
}) {
  const { data: attributesData, isLoading } = useAdminAttributes(true);
  const attributes = attributesData?.data || [];

  const [currentProductAttribute, setCurrentProductAttribute] = useState({
    productId: productId,
    attributeId: null,
    attributeOptionId: null,
    priceAdjustment: 0,
    isActive: true,
  });

  const loading =
    createProductAttribute.isLoading || updateProductAttribute.isLoading;

  // Prefill form in case of edit
  useEffect(() => {
    if (selectedProductAttribute) {
      setCurrentProductAttribute({
        id: selectedProductAttribute.id,
        productId: selectedProductAttribute.productId,
        attributeId: selectedProductAttribute.attributeId,
        attributeOptionId: selectedProductAttribute.attributeOptionId,
        isActive: selectedProductAttribute.isActive,
        priceAdjustment: selectedProductAttribute.priceAdjustment,
      });
    } else {
      setCurrentProductAttribute({
        productId: productId,
        attributeId: null,
        attributeOptionId: null,
        priceAdjustment: 0,
        isActive: true,
      });
    }
  }, [selectedProductAttribute, productId]);

  const handleSubmit = () => {
    if (!currentProductAttribute.attributeId) {
      toast.error("Please select an attribute");
      return;
    }
    if (!currentProductAttribute.attributeOptionId) {
      toast.error("Please select an attribute option");
      return;
    }

    if (selectedProductAttribute) {
      updateProductAttribute.mutate(
        { id: selectedProductAttribute.id, data: currentProductAttribute },
        {
          onSuccess: () => {
            toast.success("Product attribute updated successfully");
            refetch()
            setIsProductAttributeDialogOpen(false);
          },
          onError: (error) => toast.error(error.message||"Failed to update product attribute"),
        }
      );
    } else {
      createProductAttribute.mutate(currentProductAttribute, {
        onSuccess: () => {
          toast.success("Product attribute created successfully");
          setIsProductAttributeDialogOpen(false);
          refetch()
        },
        onError: () => toast.error("Failed to create product attribute"),
      });
    }
  };

  return (
    <Dialog
      open={isProductAttributeDialogOpen}
      onOpenChange={setIsProductAttributeDialogOpen}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedProductAttribute
              ? "Edit Product Attribute"
              : "Add Product Attribute"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Attribute select */}
          <div className="grid gap-2">
            <Label htmlFor="attribute">Attribute</Label>
            <Select
              value={currentProductAttribute.attributeId?.toString() || ""}
              onValueChange={(val) =>
                setCurrentProductAttribute((prev) => ({
                  ...prev,
                  attributeId: parseInt(val),
                  attributeOptionId: null, // reset option if attribute changes
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {attributes.map((attr) => (
                  <SelectItem key={attr.id} value={attr.id.toString()}>
                    {attr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attribute option select */}
          <div className="grid gap-2">
            <Label htmlFor="attributeOption">Attribute Option</Label>
            <Select
              value={currentProductAttribute.attributeOptionId?.toString() || ""}
              onValueChange={(val) =>
                setCurrentProductAttribute((prev) => ({
                  ...prev,
                  attributeOptionId: parseInt(val),
                }))
              }
              disabled={!currentProductAttribute.attributeId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {attributes
                  .find((a) => a.id === currentProductAttribute.attributeId)
                  ?.options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id.toString()}>
                      {opt.value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price adjustment input */}
          <div className="grid gap-2">
            <Label htmlFor="priceAdjustment">Price Adjustment</Label>
            <Input
              id="priceAdjustment"
              type="number"
              value={currentProductAttribute.priceAdjustment}
              onChange={(e) =>
                setCurrentProductAttribute((prev) => ({
                  ...prev,
                  priceAdjustment: parseFloat(e.target.value) || 0,
                }))
              }
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={currentProductAttribute.isActive}
              onCheckedChange={(val) =>
                setCurrentProductAttribute((prev) => ({
                  ...prev,
                  isActive: val,
                }))
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {/* Save button */}
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading
              ? selectedProductAttribute
                ? "Updating..."
                : "Creating..."
              : selectedProductAttribute
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductAttributeSaveUpdateDialog;
