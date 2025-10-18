import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Attribute API
export const GetAttribute = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const url = `${ENDPOINTS.ATTRIBUTES.ATTRIBUTES}?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};

export const CreateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createAttribute"],
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.ATTRIBUTES.ATTRIBUTES;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });
};

export const UpdateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateAttribute"],
    mutationFn: async ({ attribute_id, payload }: { attribute_id: string; payload: Record<string, any> }) => {
      const url = `${ENDPOINTS.ATTRIBUTES.ATTRIBUTES}/${attribute_id}`;
      const res = await putMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });
};


export const DeleteAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteAttribute"],
    mutationFn: async (attributeId: string | number) => {
      const url = `${ENDPOINTS.ATTRIBUTES.ATTRIBUTES}/${attributeId}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });
};

