
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/api"; 

// Fetch categories
export function useAdminAttributes(includeOptions=false) {
  return useQuery({
    queryKey: ["admin-attributes"],
    
     queryFn: async () => {
      const data = await adminAPI(includeOptions?"/api/admin/attributes?includeOptions=true":"/api/admin/attributes",{
        method: "GET",
      });
      return data.data;
    },
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

// Mutations (CRUD)
export function useAdminAttributesMutation() {
  const queryClient = useQueryClient();

  const createAttribute = useMutation({
    mutationFn: async (category) =>
      adminAPI("/api/admin/attributes", {
        method: "POST",body: JSON.stringify(category)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attributes"] }),
  });

  const updateAttribute = useMutation({
    mutationFn: async ({ id, data }) =>
      adminAPI(`/api/admin/attributes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attributes"] }),
  });

  const deleteAttribute = useMutation({
    mutationFn: async (id) =>
      adminAPI(`/api/admin/attributes/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-attributes"] }),
  });

  return { createAttribute, updateAttribute, deleteAttribute };
}
