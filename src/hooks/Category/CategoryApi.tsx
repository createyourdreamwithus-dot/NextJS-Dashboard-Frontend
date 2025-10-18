import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const GetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = `${ENDPOINTS.CATEGORY.CATEGORIES}?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};
export const CreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.CATEGORY.CATEGORIES;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const UpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async (payload: Record<string, any>) => {
      const { category_id, ...data } = payload;      
      const url = `${ENDPOINTS.CATEGORY.CATEGORIES}/${category_id}`;
      const res = await putMethod(url, data);
      return res.data;
    },    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};




export const DeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async (categoryId: string | number) => {
      const url = `${ENDPOINTS.CATEGORY.CATEGORIES}/${categoryId}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
