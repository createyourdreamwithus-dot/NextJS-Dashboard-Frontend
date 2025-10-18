import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCategoryIdFromSlug = (slug: string): string => {
  if (!slug) return "";
  const decodedSlug = decodeURIComponent(slug);
  const categoryId = decodedSlug.split("&")[0] || "";
  return categoryId;
};

export const GetSubCategories = (slug: string) => {
  const categoryId = getCategoryIdFromSlug(slug);

  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      if (!categoryId) {
        throw new Error("Category ID is required");
      }
      const url = `${ENDPOINTS.SUBCATEGORY.SUBCATEGORIES}/${categoryId}/subcategories?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
    enabled: !!categoryId,
  });
};

export const CreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.SUBCATEGORY.SUBCATEGORIES;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};

export const UpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateSubCategory"],
    mutationFn: async (payload: Record<string, any>) => {
      const { subcategory_id, parent_id, ...updateData } = payload;
      
      const url = `${ENDPOINTS.SUBCATEGORY.SUBCATEGORIES}/${subcategory_id}`;
      
      const res = await putMethod(url, {
        ...updateData,
        parent_id: parent_id,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};

export const DeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSubCategory"],
    mutationFn: async (payload: {
      subcategory_id: string;
    }) => {
      const { subcategory_id } = payload;
      const url = `${ENDPOINTS.SUBCATEGORY.SUBCATEGORIES}/${subcategory_id}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};
