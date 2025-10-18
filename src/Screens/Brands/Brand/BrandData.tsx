"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CreateBrand from "./CreateBrand";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { GetBrand, DeleteBrand } from "@/hooks/Brand/BrandApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

export default function BrandData() {
  const { data, isLoading, isError, error } = GetBrand();
  const { openNotification } = useNotification();
  const deleteMutation = DeleteBrand();

  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (brand: any) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = (brand: any) => {
    setSelectedBrand(brand);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedBrand) return;
    deleteMutation.mutate(selectedBrand.brand_id, {
      onSuccess: () => {
        openNotification("success", "Brand deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedBrand(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete brand."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading Brands..." />;
  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load Brands: {error?.message || "Unknown error"}
      </div>
    );
  if (!data || data.length === 0)
    return <CustomEmpty message="No Brands available" />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((brand: any) => (
          <CommonCard
            key={brand.brand_id}
            variant="white"
            onEdit={() => handleEdit(brand)}
            onDelete={() => handleDelete(brand)}
          >
            <div className="mb-4 flex justify-start">
              <Tag icon={<CheckCircleOutlined />} color="success">
                {brand.is_verified ? "Verified" : "Not Verified"}
              </Tag>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Brand Name
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {brand.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Created Date
                </p>
                <p className="text-sm text-gray-600">
                  {dayjs(brand.created_at).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {brand.description || "No description"}
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

      <CreateBrand
        open={isModalOpen}
        brands={selectedBrand}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBrand(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedBrand?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
