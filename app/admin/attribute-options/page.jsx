"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import {
  useAdminAttributeOptions,
  useAdminAttributeOptionsMutation,
} from "@/hooks/admin/useAdminAttributeOptions";
import AttributeOptionSaveUpdateDialog from "@/components/admin/dialogs/attributeOptionSaveUpdateDialog";
import { CustomBreadcrumb } from "@/components/shared/customBreadCrumb";

export default function AttributeOptionsPage() {
  const { data, isLoading, isError, refetch } = useAdminAttributeOptions();
  const {
    createAttributeOption,
    updateAttributeOption,
    deleteAttributeOption,
  } = useAdminAttributeOptionsMutation();

  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const attributeOptions = data?.data || [];

  const handleOptionDelete = async (id) => {
    if (confirm("Are you sure you want to delete this option?")) {
      deleteAttributeOption.mutate(id, {
        onSuccess: () => {
          toast.success("Option deleted successfully");
          refetch();
        },
        onError: (err) =>
          toast.error(err.message || "Something went wrong"),
      });
    }
  };

  const filteredOptions = attributeOptions.filter(
    (opt) =>
      opt.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.attribute?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
        <CustomBreadcrumb data={[
          { title: "Dashboard", link: "/admin/" },
          { title: "Red T-Shirt" } 
        ]}/>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attribute Options</h1>
          <p className="text-muted-foreground">
            Manage options like Sizes (S, M, L, XL) or Quantities.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedOption(null);
            setIsOptionDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Option
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search options..."
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

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">All Options</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Value</TableHead>
            <TableHead>Attribute</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <div className="flex h-[70vh] w-full items-center justify-center">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading options…</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={4}>
                <div className="flex h-[70vh] w-full items-center justify-center text-red-500">
                  Failed to load options. Please try again.
                </div>
              </td>
            </tr>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <TableRow key={opt.id}>
                <TableCell className="font-medium">{opt.value}</TableCell>
                <TableCell>{opt.attribute?.name || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch checked={opt.isActive} disabled />
                    <span>{opt.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedOption(opt);
                        setIsOptionDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOptionDelete(opt.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="flex h-[70vh] w-full items-center justify-center text-muted-foreground">
                  No options found.
                </div>
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      {/* Dialog */}
      <AttributeOptionSaveUpdateDialog
        isOpen={isOptionDialogOpen}
        onOpenChange={setIsOptionDialogOpen}
        selectedOption={selectedOption}
        createAttributeOption={createAttributeOption}
        updateAttributeOption={updateAttributeOption}
      />
    </div>
  );
}
