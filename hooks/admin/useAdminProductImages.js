import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api";

// ✅ Fetch product images
export function useAdminProductImages(productId) {
  return useQuery({
    queryKey: ["admin-product-images", productId],
    queryFn: async () => {
      if (!productId) return [];
      const data = await adminAPI(`/api/admin/product-images?productId=${productId}`, {
        method: "GET",
      });
      return data.data;
    },
    enabled: !!productId, // ✅ only fetch if productId exists
    staleTime: 1000 * 60,
    retry: 1,
  });
}

// ✅ Mutations for Product Images (CRUD)
export function useAdminProductImageMutation(productId) {
  const queryClient = useQueryClient();

  // Create Image (Upload FormData)
  const createProductImage = useMutation({
    mutationFn: async (formData) => {
      return adminAPI(`/api/admin/product-images`, {
        method: "POST",
        body: formData, 
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-product-images", productId] }),
  });

  // Update Image (PUT with FormData or JSON depending on your API)
  const updateProductImage = useMutation({
    mutationFn: async ({ id, formData }) => {
      return adminAPI(`/api/admin/product-images/${id}`, {
        method: "PUT",
        body: formData, 
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-product-images", productId] }),
  });

  // Delete Image
  const deleteProductImage = useMutation({
    mutationFn: async (id) => {
      return adminAPI(`/api/admin/product-images/${id}`, { method: "DELETE" });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-product-images", productId] }),
  });

  return { createProductImage, updateProductImage, deleteProductImage };
}
