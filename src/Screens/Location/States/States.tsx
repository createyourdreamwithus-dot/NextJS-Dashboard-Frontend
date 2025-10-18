"use client";

import dayjs from "dayjs";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import { GetStates, toggleStatesStatus } from "@/hooks/Location/LocationApi";
import { useQueryClient } from "@tanstack/react-query";
import ToggleSwitch from "@/app/components/main/Ui/ToggleSwitch/ToggleSwitch";

const States = () => {
  const { data, isLoading, isError, error } = GetStates();
  const queryClient = useQueryClient();

  const handleToggle = async (states: any) => {
    try {
      await toggleStatesStatus(states.state_id, !states.is_active);
      queryClient.invalidateQueries({ queryKey: ["states"] });
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };
  if (isLoading) return <CustomLoader text="Loading States..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load states: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {!data || data.length === 0 ? (
        <CustomEmpty message="No states available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((states: any) => (
            <CommonCard key={states.state_id} variant="white">
              <div className="mb-4 flex justify-between items-start">
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Code: {states.iso_code}
                </span>
                <ToggleSwitch
                  isOn={states.is_active}
                  onChange={() => handleToggle(states)}
                />
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  States Name
                </p>
                <p className="text-lg text-gray-600">{states.name}</p>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Created Date
                </p>
                <p className="text-sm text-gray-600">
                  {dayjs(states.created_at).format("DD MMM YYYY, HH:mm")}
                </p>
              </div>
            </CommonCard>
          ))}
        </div>
      )}
    </>
  );
};

export default States;
