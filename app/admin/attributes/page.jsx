"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

import { toast } from "react-hot-toast";
import AttributeSaveUpdateDialog from "@/components/admin/dialogs/attributeSaveUpdateDialog";
import { useAdminAttributes, useAdminAttributesMutation } from "@/hooks/admin/useAdminAttributes";
import { Switch } from "@/components/ui/switch";

export default function AttributesPage() {
 const { data, isLoading, isError, refetch } = useAdminAttributes(false);
const attributes = data?.data || [];
const {createAttribute, updateAttribute,deleteAttribute } = useAdminAttributesMutation();


  
  const [isAttributeDialogOpen, setIsAttributeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState(null);

const handleAttributeDelete = async (id) => {
  if (confirm("Are you sure you want to delete this attribute?")) {
    deleteAttribute.mutate(id, {
        onSuccess: () => {
            toast.success("Attribute deleted successfully");
            refetch();
        }
        ,
        onError: (err) => toast.error(err.message || "Something went wrong"),
    });
  }
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
        <Button
          onClick={() => {
            setIsAttributeDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Attribute
        </Button>

        <AttributeSaveUpdateDialog
          isAttributeDialogOpen={isAttributeDialogOpen}
          setIsAttributeDialogOpen={setIsAttributeDialogOpen}
          selectedAttribute={selectedAttribute}
          createAttribute={createAttribute}
          updateAttribute={updateAttribute}
          refetch={refetch}
        />
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


  <h2 className="text-xl font-semibold mb-4">All Attributes</h2>
  
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="w-[200px]">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
    {isLoading ? (
  <div className="flex h-[70vh] w-full items-center justify-center ">
    <div className="flex items-center gap-3 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Loading products…</span>
    </div>
  </div>
) : isError ? (
  <div className="flex h-[70vh] w-full items-center justify-center text-red-500">
    Failed to load products. Please try again.
  </div>
) : attributes && attributes.length > 0 ? (
  attributes.map((attribute) => (
    <TableRow key={attribute.id}>
      <TableCell className="font-medium">{attribute.name}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={attribute.isActive}
            onCheckedChange={(value) => handleToggle(attribute.id, value)}
          />
          <span>{attribute.isActive ? "Active" : "Inactive"}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={()=>{
                setSelectedAttribute(attribute);
                setIsAttributeDialogOpen(true);
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handleAttributeDelete(attribute.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ))
) : (
  <div className="flex h-[70vh] w-full items-center justify-center text-muted-foreground">
    No attributes found.
  </div>
)}


    </TableBody>
  </Table>


    </div>
  );
}
