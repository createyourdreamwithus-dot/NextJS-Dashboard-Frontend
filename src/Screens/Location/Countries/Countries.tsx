"use client";

import dayjs from "dayjs";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import {
  GetCountries,
  toggleCountryStatus,
} from "@/hooks/Location/LocationApi";
import { useQueryClient } from "@tanstack/react-query";
import ToggleSwitch from "@/app/components/main/Ui/ToggleSwitch/ToggleSwitch";

const Countries = () => {
  const { data, isLoading, isError, error } = GetCountries();
  const queryClient = useQueryClient();

  const handleToggle = async (country: any) => {
    try {
      await toggleCountryStatus(country.country_id, !country.is_active);
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  if (isLoading) return <CustomLoader text="Loading countries..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load countries: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {!data || data.length === 0 ? (
        <CustomEmpty message="No countries available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((country: any) => (
            <CommonCard key={country.country_id} variant="white">
              <div className="mb-4 flex justify-between items-center">
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Code: {country.iso_code}
                </span>
                <ToggleSwitch
                  isOn={country.is_active}
                  onChange={() => handleToggle(country)}
                />
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Country Name
                </p>
                <p className="text-lg text-gray-600">{country.name}</p>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Created Date
                </p>
                <p className="text-sm text-gray-600">
                  {dayjs(country.created_at).format("DD MMM YYYY, HH:mm")}
                </p>
              </div>
            </CommonCard>
          ))}
        </div>
      )}
    </>
  );
};

export default Countries;
