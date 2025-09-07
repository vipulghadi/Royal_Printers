"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AttributeOptionsPage() {
  const [attributes, setAttributes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [optionFormData, setOptionFormData] = useState({
    attributeId: null,
    value: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttributes();
    fetchAttributeOptions();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch("/api/attributes");
      const data = await res.json();
      setAttributes(data.data || []);
    } catch (error) {
      console.error("Failed to fetch attributes:", error);
      toast.error("Failed to fetch attributes");
    }
  };

  const fetchAttributeOptions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/attribute-options");
      const data = await res.json();
      setAttributeOptions(data.data || []);
    } catch (error) {
      console.error("Failed to fetch attribute options:", error);
      toast.error("Failed to fetch attribute options");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSubmit = async (e) => {
    e.preventDefault();
    if (!optionFormData.attributeId) {
      toast.error("Please select an attribute");
      return;
    }

    try {
      const url = editingOption
        ? `/api/attribute-options/${editingOption.id}`
        : `/api/attribute-options/`;
      const method = editingOption ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer admin-token`,
        },

        body: JSON.stringify({
          value: optionFormData.value,
          attributeId: Number(optionFormData.attributeId),
          isActive: optionFormData.isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save option");
      }

      toast.success(
        `Option ${editingOption ? "updated" : "created"} successfully`
      );

      fetchAttributeOptions();
      setIsOptionDialogOpen(false);
      setEditingOption(null);
      setOptionFormData({ attributeId: "", value: "", isActive: true });
    } catch (error) {
      console.error("Failed to save option:", error);
      toast.error(error.message || "Failed to save option");
    }
  };

  const handleEditOption = (option) => {
    setEditingOption(option);
    setOptionFormData({
      attributeId: option.attributeId || "",
      value: option.value,

      isActive: option.isActive,
    });
    setIsOptionDialogOpen(true);
  };

  const handleDeleteOption = async (optionId) => {
    if (!confirm("Are you sure you want to delete this option?")) return;

    try {
      const response = await fetch(`/api/attribute-options/${optionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer admin-token`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete option");
      }

      toast.success("Option deleted successfully");

      fetchAttributeOptions();
    } catch (error) {
      console.error("Failed to delete option:", error);
      toast.error(error.message || "Failed to delete option");
    }
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Attribute Options</h1>
        </div>
        <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingOption(null);
                setOptionFormData({
                  attributeId: "",
                  value: "",
                  isActive: true,
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingOption ? "Edit Option" : "Add Option"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleOptionSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="attribute-select">Attribute</Label>
                <Select
                  value={optionFormData.attributeId}
                  onValueChange={(value) =>
                    setOptionFormData({
                      ...optionFormData,
                      attributeId: Number(value),
                    })
                  }
                >
                  <SelectTrigger id="attribute-select">
                    <SelectValue placeholder="Select an attribute" />
                  </SelectTrigger>
                  <SelectContent>
                    {attributes.map((attribute) => (
                      <SelectItem key={attribute.id} value={attribute.id}>
                        {attribute.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Option Value</Label>
                <Input
                  id="value"
                  value={optionFormData.value}
                  onChange={(e) =>
                    setOptionFormData({
                      ...optionFormData,
                      value: e.target.value,
                    })
                  }
                  placeholder={`e.g., ${getPlaceholderForAttribute(
                    attributes.find(
                      (attr) => attr.id === optionFormData.attributeId
                    )?.name
                  )}`}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={optionFormData.isActive}
                  onCheckedChange={(checked) =>
                    setOptionFormData({ ...optionFormData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingOption ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOptionDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Attribute Options</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>

                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributeOptions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No options found. Add your first option!
                  </TableCell>
                </TableRow>
              ) : (
                attributeOptions.map((option) => {
                  return (
                    <TableRow key={option.id}>
                      <TableCell>{option.attribute?.name || "N/A"}</TableCell>
                      <TableCell>{option.value}</TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditOption(option)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteOption(option.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function getPlaceholderForAttribute(attributeName) {
  const examples = {
    Size: "XL, Small, 85x55mm, A4",
    Material: "Premium Matte, Cotton, Ceramic",
    Quantity: "100 pieces, 1000 pieces",
    "Print Sides": "Single Side, Double Sided",
    Finish: "Glossy Finish, Matte Finish",
    Color: "Full Color, Black & White",
    Binding: "Spiral Binding, Perfect Bound",
    "Paper Weight": "250 GSM, 300 GSM",
  };

  return examples[attributeName] || "Value for this attribute";
}
