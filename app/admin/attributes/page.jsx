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
import { Plus, Edit, Trash2, Search, X, List, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AttributesPage() {
  const [attributes, setAttributes] = useState([]);
  const [isAttributeDialogOpen, setIsAttributeDialogOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [attributeFormData, setAttributeFormData] = useState({
    name: "",
    isActive: true,
    history: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/attributes");
      const data = await res.json();

      setAttributes(data.data || []);
    } catch (error) {
      console.error("Failed to fetch attributes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch attributes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAttributeSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAttribute
        ? `/api/attributes/${editingAttribute.id}`
        : "/api/attributes";
      const method = editingAttribute ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer admin-token`,
        },
        body: JSON.stringify({
          ...attributeFormData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save attribute");
      }

      toast.success(
        `Attribute ${editingAttribute ? "updated" : "created"} successfully`
      );

      fetchAttributes();
      setIsAttributeDialogOpen(false);
      setEditingAttribute(null);
      setAttributeFormData({ name: "", isActive: true });
    } catch (error) {
      console.error("Failed to save attribute:", error);
      toast.error(error.message || "Failed to save attribute");
    }
  };

  const handleEditAttribute = (attribute) => {
    setEditingAttribute(attribute);
    setAttributeFormData({
      name: attribute.name,
      isActive: attribute.isActive,
    });
    setIsAttributeDialogOpen(true);
  };

  const handleDeleteAttribute = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this attribute? This will also delete all associated options."
      )
    )
      return;

    try {
      const response = await fetch(`/api/attributes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer admin-token`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete attribute");
      }

      toast.success("Attribute deleted successfully");

      fetchAttributes();
    } catch (error) {
      console.error("Failed to delete attribute:", error);
      toast.error(error.message || "Failed to delete attribute");
    }
  };

  const filteredAttributes = attributes.filter((attr) =>
    attr.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attributes</h1>
          <p className="text-muted-foreground">
            Manage product attributes like Material, Size, Quantity, etc.
          </p>
        </div>
        <Dialog
          open={isAttributeDialogOpen}
          onOpenChange={setIsAttributeDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingAttribute(null);
                setAttributeFormData({ name: "", isActive: true, history: [] });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Attribute
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAttribute ? "Edit Attribute" : "Add Attribute"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAttributeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Attribute Name</Label>
                <Input
                  id="name"
                  value={attributeFormData.name}
                  onChange={(e) =>
                    setAttributeFormData({
                      ...attributeFormData,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Material, Size, Quantity"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={attributeFormData.isActive}
                  onCheckedChange={(checked) =>
                    setAttributeFormData({
                      ...attributeFormData,
                      isActive: checked,
                    })
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingAttribute ? "Update" : "Create"}
                </Button>
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
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search attributes..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-2.5 top-2.5"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttributes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {searchQuery
                      ? "No attributes found matching your search"
                      : "No attributes found. Add your first attribute!"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAttributes.map((attribute) => (
                  <TableRow key={attribute.id}>
                    <TableCell className="font-medium">
                      {attribute.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={attribute.isActive ? "default" : "secondary"}
                      >
                        {attribute.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditAttribute(attribute)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteAttribute(attribute.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
