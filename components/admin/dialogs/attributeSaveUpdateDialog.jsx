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

function AttributeSaveUpdateDialog({
  isAttributeDialogOpen,
  setIsAttributeDialogOpen,
  selectedAttribute,
  createAttribute,
  updateAttribute,
}) {
  const [attributeData, setAttributeData] = useState({
    name: "",
    isActive: true,
  });
  const isLoading=createAttribute.isLoading || updateAttribute.isLoading;

  // Update state if selectedAttribute changes
  useEffect(() => {
    if (selectedAttribute) {
      setAttributeData(selectedAttribute);
    } else {
      setAttributeData({ name: "", isActive: true });
    }
  }, [selectedAttribute]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!attributeData.name.trim()) {
      toast.error("Attribute name is required");
      return;
    }

    if (selectedAttribute) {
      updateAttribute.mutate(
        { id: selectedAttribute.id, data: attributeData },
        {
          onSuccess: () => {
            toast.success("Attribute updated successfully");
            setIsAttributeDialogOpen(false);
          },
          onError: (err) => toast.error(err.message || "Something went wrong"),
        }
      );
    } else {
      createAttribute.mutate(attributeData, {
        onSuccess: () => {
          toast.success("Attribute created successfully");
          setIsAttributeDialogOpen(false);
        },
        onError: (err) => toast.error(err.message || "Something went wrong"),
      });
      setAttributeData({ name: "", isActive: true });
    }
  };

  return (
    <Dialog open={isAttributeDialogOpen} onOpenChange={setIsAttributeDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedAttribute ? "Edit Attribute" : "Add Attribute"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Attribute Name</Label>
            <Input
              id="name"
              value={attributeData.name}
              onChange={(e) => setAttributeData({ ...attributeData, name: e.target.value })}
              placeholder="e.g., Material, Size, Quantity"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={attributeData.isActive}
              onCheckedChange={(value) =>
                setAttributeData({ ...attributeData, isActive: value })
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit">{isLoading?"Loading":selectedAttribute ? "Update" : "Create"}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAttributeDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AttributeSaveUpdateDialog;
