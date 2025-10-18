"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CreateUnit from "./CreateUnit";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { GetUnit, DeleteUnit } from "@/hooks/Unit/UnitApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

export default function UnitData() {
  const { data, isLoading, isError, error } = GetUnit();
  const { openNotification } = useNotification();
  const deleteMutation = DeleteUnit();

  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (unit: any) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleDelete = (unit: any) => {
    setSelectedUnit(unit);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedUnit) return;
    deleteMutation.mutate(selectedUnit.unit_id, {
      onSuccess: () => {
        openNotification("success", "Unit deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedUnit(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete unit."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading Units..." />;
  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load Units: {error?.message || "Unknown error"}
      </div>
    );
  if (!data || data.length === 0)
    return <CustomEmpty message="No Units available" />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((unit: any) => (
          <CommonCard
            key={unit.unit_id}
            variant="white"
            onEdit={() => handleEdit(unit)}
            onDelete={() => handleDelete(unit)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Unit Name
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {unit.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Created Date
                </p>
                <p className="text-sm text-gray-600">
                  {dayjs(unit.created_at).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {unit.description || "No description"}
              </p>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <CustomButton
                label="View Details"
                icon={<EyeOutlined />}
                className="!text-sm"
              />
            </div>
          </CommonCard>
        ))}
      </div>

      <CreateUnit
        open={isModalOpen}
        units={selectedUnit}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUnit(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedUnit?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
