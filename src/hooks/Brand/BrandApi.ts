import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get brands API
export const GetBrand = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const url = `${ENDPOINTS.BRANDS.BRANDS}?limit=5`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};

export const CreateBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createBrand"],
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.BRANDS.BRANDS;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const UpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBrand"],
    mutationFn: async ({ brand_id, values }: { brand_id: string; values: Record<string, any> }) => {
      const url = `${ENDPOINTS.BRANDS.BRANDS}/${brand_id}`;
      const res = await putMethod(url, values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};


export const DeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: async (brandId: string | number) => {
      const url = `${ENDPOINTS.BRANDS.BRANDS}/${brandId}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

