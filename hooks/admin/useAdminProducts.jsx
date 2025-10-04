
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api"; 

// Fetch categories
export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const data = await adminAPI("/api/admin/products",{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

export function useAdminProduct(id) {
  return useQuery({
    queryKey: ["admin-product",id],
    queryFn: async () => {
      const data = await adminAPI(`/api/admin/products/${id}`,{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}


// Mutations (CRUD)
export function useAdminProductMutation() {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: async (product) =>
      adminAPI("/api/admin/products", {
        method: "POST",body: JSON.stringify(product)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const updateProduct = useMutation({
    
    mutationFn: async ({ id, data }) =>
      adminAPI(`/api/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id) =>
      adminAPI(`/api/admin/products/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  return { createProduct, updateProduct, deleteProduct };
}
