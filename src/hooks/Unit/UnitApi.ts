import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get units API
export const GetUnit = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const url = `${ENDPOINTS.UNITS.UNITS}?limit=5`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};

export const CreateUnits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createUnit"],
    mutationFn: async (payload: Record<string, any>) => {
      const url = ENDPOINTS.UNITS.UNITS;
      const res = await postMethod(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

export const UpdateUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUnit"],
    mutationFn: async ({ unit_id, values }: { unit_id: string; values: Record<string, any> }) => {
      const url = `${ENDPOINTS.UNITS.UNITS}/${unit_id}`;
      const res = await putMethod(url, values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};


export const DeleteUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteUnit"],
    mutationFn: async (unitId: string | number) => {
      const url = `${ENDPOINTS.UNITS.UNITS}/${unitId}`;
      const res = await deleteMethod(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

