
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api"; 

// Fetch categories
export function useAdminAttributeOptions() {
  return useQuery({
    queryKey: ["admin-attribute-options"],
    queryFn: async () => {
      const data = await adminAPI("/api/admin/attribute-options/",{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

// Mutations (CRUD)
export function useAdminAttributeOptionsMutation() {
  const queryClient = useQueryClient();

  const createAttributeOption = useMutation({
    mutationFn: async (category) =>
      adminAPI("/api/admin/attribute-options", {
        method: "POST",body: JSON.stringify(category)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attribute-options"] }),
  });

  const updateAttributeOption = useMutation({
    mutationFn: async ({ id, data }) =>
      adminAPI(`/api/admin/attribute-options/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attribute-options"] }),
  });

  const deleteAttributeOption = useMutation({
    mutationFn: async (id) =>
      adminAPI(`/api/admin/attribute-options/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attribute-options"] }),
  });

  return { createAttributeOption, updateAttributeOption, deleteAttributeOption };
}
