"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CreateAttributes from "./CreateAttribute";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { DeleteAttribute, GetAttribute } from "@/hooks/Attribute/AttributeApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";

export default function AttributeData() {
  const { data, isLoading, isError, error } = GetAttribute();
  const { openNotification } = useNotification();
  const deleteMutation = DeleteAttribute();

  const [selectedAttribute, setSelectedAttribute] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsModalOpen(true);
  };

  const handleDelete = (attribute: any) => {
    setSelectedAttribute(attribute);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedAttribute) return;
    deleteMutation.mutate(selectedAttribute.attribute_id, {
      onSuccess: () => {
        openNotification("success", "Attribute deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedAttribute(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete attribute."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading Attributes..." />;
  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load Attributes: {error?.message || "Unknown error"}
      </div>
    );
  if (!data || data.length === 0)
    return <CustomEmpty message="No Attributes available" />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((attribute: any) => (
          <CommonCard
            key={attribute.attribute_id}
            variant="white"
            onEdit={() => handleEdit(attribute)}
            onDelete={() => handleDelete(attribute)}
          >
            <div className="mb-4 flex justify-start">
              <Tag icon={<CheckCircleOutlined />} color="success">
                Active
              </Tag>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 pb-4 border-b border-gray-200">
            
              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                 Attribute Name
                </p>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {attribute.name}
                </p>
              </div>


            <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Created Date
                </p>
                <p className="text-sm text-gray-600">
                  {dayjs(attribute.created_at).format("DD MMM YYYY")}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Type
                </p>
                <p className="text-sm text-gray-600">
                  {attribute.data_type.charAt(0).toUpperCase() +
                    attribute.data_type.slice(1).toLowerCase()}
                </p>
              </div>

           
            </div>
            <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {attribute.description || "No description"}
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

      <CreateAttributes
        open={isModalOpen}
        attributes={selectedAttribute}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAttribute(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedAttribute?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
