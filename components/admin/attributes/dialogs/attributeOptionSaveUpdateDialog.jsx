import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import { useAdminAttributes } from "@/hooks/admin/useAdminAttributes";

function AttributeOptionSaveUpdateDialog({
  isOpen,
  onOpenChange,
  selectedOption,
  createAttributeOption,
  updateAttributeOption,
}) {
  const { data, isLoading } = useAdminAttributes();
  const attributes = data?.data || [];

  const [optionData, setOptionData] = useState({
    value: "",
    isActive: true,
    attributeId: null,
  });

  const loading =
    createAttributeOption.isLoading || updateAttributeOption.isLoading;

  // Load data when editing
  useEffect(() => {
    if (selectedOption) {
      setOptionData({
        value: selectedOption.value || "",
        isActive: selectedOption.isActive ?? true,
        attributeId: selectedOption.attributeId || null,
      });
    } else {
      setOptionData({ value: "", isActive: true, attributeId: null });
    }
  }, [selectedOption]);

  const handleSubmit = () => {
    if (!optionData.value.trim()) {
      toast.error("Option value is required");
      return;
    }
    if (!optionData.attributeId) {
      toast.error("Attribute is required");
      return;
    }

    if (selectedOption) {
      updateAttributeOption.mutate(
        { id: selectedOption.id, data: optionData },
        {
          onSuccess: () => {
            toast.success("Option updated successfully");
            onOpenChange(false);
          },
          onError: () => toast.error("Failed to update option"),
        }
      );
    } else {
      createAttributeOption.mutate(optionData, {
        onSuccess: () => {
          toast.success("Option created successfully");
          onOpenChange(false);
        },
        onError: () => toast.error("Failed to create option"),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedOption ? "Edit Option" : "Add Option"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Value input */}
          <div className="grid gap-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="text"
              placeholder="e.g. Large, XL, 500ml"
              value={optionData.value}
              onChange={(e) =>
                setOptionData({ ...optionData, value: e.target.value })
              }
            />
          </div>

          {/* Attribute select */}
          <div className="grid gap-2">
            <Label htmlFor="attribute">Attribute</Label>
            <Select
              value={optionData.attributeId?.toString() || ""}
              onValueChange={(val) =>
                setOptionData({ ...optionData, attributeId: parseInt(val) })
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

          {/* Active toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={optionData.isActive}
              onCheckedChange={(val) =>
                setOptionData({ ...optionData, isActive: val })
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {/* Save button */}
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading
              ? selectedOption
                ? "Updating..."
                : "Creating..."
              : selectedOption
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AttributeOptionSaveUpdateDialog;
