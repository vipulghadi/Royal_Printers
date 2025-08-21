"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Settings, Search, X, ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

import { Separator } from "@/components/ui/separator"

export default function AttributesPage() {
  const [attributes, setAttributes] = useState([])
  const [attributeOptions, setAttributeOptions] = useState([])
  const [isAttributeDialogOpen, setIsAttributeDialogOpen] = useState(false)
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false)
  const [editingAttribute, setEditingAttribute] = useState(null)
  const [editingOption, setEditingOption] = useState(null)
  const [selectedAttribute, setSelectedAttribute] = useState(null)
  const [attributeFormData, setAttributeFormData] = useState({ name: "", isActive: true })
  const [optionFormData, setOptionFormData] = useState({ value: "", isActive: true })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("attributes")

  useEffect(() => {
    fetchAttributes()
  }, [])

  useEffect(() => {
    if (selectedAttribute) {
      fetchAttributeOptions(selectedAttribute.id)
    }
  }, [selectedAttribute])

  const fetchAttributes = async () => {
    try {
      const res = await fetch("/api/admin/attributes")
      const data = await res.json()
      setAttributes(data.attributes || [])
      
      // Select the first attribute by default if available
      if (data.attributes && data.attributes.length > 0 && !selectedAttribute) {
        setSelectedAttribute(data.attributes[0])
      }
    } catch (error) {
      console.error("Failed to fetch attributes:", error)
      toast({
        title: "Error",
        description: "Failed to fetch attributes",
        variant: "destructive",
      })
    }
  }

  const fetchAttributeOptions = async (attributeId) => {
    try {
      const res = await fetch(`/api/admin/attributes/${attributeId}/options`)
      const data = await res.json()
      setAttributeOptions(data.options || [])
    } catch (error) {
      console.error("Failed to fetch attribute options:", error)
      toast({
        title: "Error",
        description: "Failed to fetch attribute options",
        variant: "destructive",
      })
    }
  }

  const handleAttributeSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingAttribute ? `/api/admin/attributes/${editingAttribute.id}` : "/api/admin/attributes"
      const method = editingAttribute ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attributeFormData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save attribute")
      }

      toast({
        title: editingAttribute ? "Attribute Updated" : "Attribute Created",
        description: editingAttribute 
          ? `${attributeFormData.name} has been updated successfully` 
          : `${attributeFormData.name} has been added successfully`,
      })

      fetchAttributes()
      setIsAttributeDialogOpen(false)
      setEditingAttribute(null)
      setAttributeFormData({ name: "", isActive: true })
    } catch (error) {
      console.error("Failed to save attribute:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save attribute",
        variant: "destructive",
      })
    }
  }

  const handleOptionSubmit = async (e) => {
    e.preventDefault()
    if (!selectedAttribute) return
    
    try {
      const url = editingOption 
        ? `/api/admin/attributes/options/${editingOption.id}` 
        : `/api/admin/attributes/${selectedAttribute.id}/options`
      const method = editingOption ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(optionFormData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save option")
      }

      toast({
        title: editingOption ? "Option Updated" : "Option Created",
        description: editingOption 
          ? `${optionFormData.value} has been updated successfully` 
          : `${optionFormData.value} has been added to ${selectedAttribute.name}`,
      })

      fetchAttributeOptions(selectedAttribute.id)
      setIsOptionDialogOpen(false)
      setEditingOption(null)
      setOptionFormData({ value: "", isActive: true })
    } catch (error) {
      console.error("Failed to save option:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save option",
        variant: "destructive",
      })
    }
  }

  const handleEditAttribute = (attribute) => {
    setEditingAttribute(attribute)
    setAttributeFormData({ 
      name: attribute.name,
      isActive: attribute.isActive 
    })
    setIsAttributeDialogOpen(true)
  }

  const handleEditOption = (option) => {
    setEditingOption(option)
    setOptionFormData({ 
      value: option.value,
      isActive: option.isActive 
    })
    setIsOptionDialogOpen(true)
  }

  const handleDeleteAttribute = async (id) => {
    if (!confirm("Are you sure you want to delete this attribute? This will also delete all associated options.")) return

    try {
      const response = await fetch(`/api/admin/attributes/${id}`, { method: "DELETE" })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete attribute")
      }

      toast({
        title: "Attribute Deleted",
        description: "The attribute has been deleted successfully",
      })

      fetchAttributes()
      
      // If the deleted attribute was selected, clear the selection
      if (selectedAttribute && selectedAttribute.id === id) {
        setSelectedAttribute(null)
        setAttributeOptions([])
      }
    } catch (error) {
      console.error("Failed to delete attribute:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete attribute",
        variant: "destructive",
      })
    }
  }

  const handleDeleteOption = async (optionId) => {
    if (!confirm("Are you sure you want to delete this option?")) return

    try {
      const response = await fetch(`/api/admin/attributes/options/${optionId}`, { method: "DELETE" })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete option")
      }

      toast({
        title: "Option Deleted",
        description: "The option has been deleted successfully",
      })

      fetchAttributeOptions(selectedAttribute.id)
    } catch (error) {
      console.error("Failed to delete option:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete option",
        variant: "destructive",
      })
    }
  }

  const selectAttribute = (attribute) => {
    setSelectedAttribute(attribute)
    setActiveTab("options")
  }

  const filteredAttributes = attributes.filter(attr => 
    attr.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attributes</h1>
          <p className="text-muted-foreground">
            Manage product attributes like Material, Size, Quantity, etc. and their values
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="options">Attribute Values</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attributes" className="space-y-4">
          <div className="flex justify-between items-center">
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
            
            <Dialog open={isAttributeDialogOpen} onOpenChange={setIsAttributeDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingAttribute(null)
                    setAttributeFormData({ name: "", isActive: true })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Attribute
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingAttribute ? "Edit Attribute" : "Add Attribute"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAttributeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Attribute Name</Label>
                    <Input
                      id="name"
                      value={attributeFormData.name}
                      onChange={(e) => setAttributeFormData({ ...attributeFormData, name: e.target.value })}
                      placeholder="e.g., Material, Size, Quantity"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={attributeFormData.isActive}
                      onCheckedChange={(checked) => setAttributeFormData({ ...attributeFormData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">{editingAttribute ? "Update" : "Create"}</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAttributeDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                    <TableHead>Values</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttributes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? "No attributes found matching your search" : "No attributes found. Add your first attribute!"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttributes.map((attribute) => (
                      <TableRow key={attribute.id}>
                        <TableCell className="font-medium">{attribute.name}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => selectAttribute(attribute)}
                          >
                            Manage Values
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge variant={attribute.isActive ? "default" : "secondary"}>
                            {attribute.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditAttribute(attribute)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => selectAttribute(attribute)}>
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDeleteAttribute(attribute.id)}>
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
        </TabsContent>
        
        <TabsContent value="options" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setActiveTab("attributes")}>
                Back to Attributes
              </Button>
              {selectedAttribute && (
                <h2 className="text-xl font-semibold">
                  Values for: <span className="text-primary">{selectedAttribute.name}</span>
                </h2>
              )}
            </div>
            
            {selectedAttribute && (
              <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingOption(null)
                      setOptionFormData({ value: "", isActive: true })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Value
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingOption ? "Edit Value" : `Add Value for ${selectedAttribute.name}`}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleOptionSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        value={optionFormData.value}
                        onChange={(e) => setOptionFormData({ ...optionFormData, value: e.target.value })}
                        placeholder={`e.g., ${getPlaceholderForAttribute(selectedAttribute.name)}`}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={optionFormData.isActive}
                        onCheckedChange={(checked) => setOptionFormData({ ...optionFormData, isActive: checked })}
                      />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">{editingOption ? "Update" : "Create"}</Button>
                      <Button type="button" variant="outline" onClick={() => setIsOptionDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {selectedAttribute ? (
            <Card>
              <CardHeader>
                <CardTitle>Values for {selectedAttribute.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attributeOptions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          No values found for this attribute. Add your first value!
                        </TableCell>
                      </TableRow>
                    ) : (
                      attributeOptions.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell>{option.value}</TableCell>
                          <TableCell>
                            <Badge variant={option.isActive ? "default" : "secondary"}>
                              {option.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => handleEditOption(option)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleDeleteOption(option.id)}>
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
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Attribute Selected</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Please select an attribute from the Attributes tab to manage its values
              </p>
              <Button className="mt-4" onClick={() => setActiveTab("attributes")}>
                Go to Attributes
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to generate placeholder examples based on attribute name
function getPlaceholderForAttribute(attributeName) {
  const examples = {
    "Size": "XL, Small, 85x55mm, A4",
    "Material": "Premium Matte, Cotton, Ceramic",
    "Quantity": "100 pieces, 1000 pieces",
    "Print Sides": "Single Side, Double Sided",
    "Finish": "Glossy Finish, Matte Finish",
    "Color": "Full Color, Black & White",
    "Binding": "Spiral Binding, Perfect Bound",
    "Paper Weight": "250 GSM, 300 GSM"
  }
  
  return examples[attributeName] || "Value for this attribute"
}
