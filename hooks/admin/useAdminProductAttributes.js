
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api"; 

// Fetch categories
export function useAdminProductAttributes() {
  return useQuery({
    queryKey: ["admin-product-attributes"],
    queryFn: async () => {
      const data = await adminAPI("/api/admin/product-attributes",{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

export function useAdminProductAttributesMutation() {
  const queryClient = useQueryClient();

  const createProductAttribute = useMutation({
    mutationFn: async (data) =>
      adminAPI("/api/admin/product-attributes", {
        method: "POST",body: JSON.stringify(data)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-product-attributes"] }),
  });

  const updateProductAttribute = useMutation({
    mutationFn: async ({ id, data }) =>
      adminAPI(`/api/admin/product-attributes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-product-attributes"] }),
  });

  const deleteProductAttribute = useMutation({
    mutationFn: async (id) =>
      adminAPI(`/api/admin/product-attributes/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-product-attributes"] }),
  });

  return { createProductAttribute, updateProductAttribute, deleteProductAttribute };
}
