
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api"; 

// Fetch categories
export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const data = await adminAPI("/api/admin/categories",{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

// Mutations (CRUD)
export function useAdminCategoryMutation() {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: async (category) =>
      adminAPI("/api/admin/categories", {
        method: "POST",body: JSON.stringify(category)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, data }) =>
      adminAPI(`/api/admin/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-categories"] }),
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) =>
      adminAPI(`/api/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-categories"] }),
  });

  return { createCategory, updateCategory, deleteCategory };
}
