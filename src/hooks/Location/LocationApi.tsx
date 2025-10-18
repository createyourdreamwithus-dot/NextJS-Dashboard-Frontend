import { getMethod, patchMethod } from "@/app/services/api-services";
import { ENDPOINTS } from "@/app/services/endpoints";
import { useQuery } from "@tanstack/react-query";

export const GetCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const url = `${ENDPOINTS.LOCATION.COUNTRIES}?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};
export const toggleCountryStatus = async (
  countryId: string,
  isActive: boolean
) => {
  const url = `${ENDPOINTS.LOCATION.COUNTRIES}/${countryId}/active-status`;
  return await patchMethod(url, { is_active: isActive });
};
export const GetStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const url = `${ENDPOINTS.LOCATION.STATES}?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};
export const toggleStatesStatus = async (
  statesId: string,
  isActive: boolean
) => {
  const url = `${ENDPOINTS.LOCATION.STATES}/${statesId}/active-status`;
  return await patchMethod(url, { is_active: isActive });
};

export const GetDistricts = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const url = `${ENDPOINTS.LOCATION.DISTRICTS}?limit=10`;
      const res = await getMethod(url);
      return res.data;
    },
  });
};
export const toggleDistrictStatus = async (
  districtsId: string,
  isActive: boolean
) => {
  const url = `${ENDPOINTS.LOCATION.DISTRICTS}/${districtsId}/active-status`;
  return await patchMethod(url, { is_active: isActive });
};