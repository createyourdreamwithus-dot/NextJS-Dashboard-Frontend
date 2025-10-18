"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import CategoryModal from "./CategoryCreate";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { GetCategories, DeleteCategory } from "@/hooks/Category/CategoryApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import { useRouter } from "next/navigation";

const CategoryData = () => {
  const { data, isLoading, isError, error } = GetCategories();
  const { openNotification } = useNotification();
  const deleteMutation = DeleteCategory();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;

    deleteMutation.mutate(selectedCategory.category_id, {
      onSuccess: () => {
        openNotification("success", "Category deleted successfully!");
        setIsDeleteOpen(false);
        setSelectedCategory(null);
      },
      onError: (err: any) => {
        openNotification(
          "error",
          err?.response?.data?.message || "Failed to delete category."
        );
      },
    });
  };

  if (isLoading) return <CustomLoader text="Loading categories..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load categories: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {!data || data.length === 0 ? (
        <CustomEmpty message="No categories available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((category: any) => (
            <CommonCard
              key={category.category_id}
              variant="white"
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDelete(category)}
            >
              <div className="mb-4 flex justify-between items-start">
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  Display Order: {category.display_order}
                </span>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                    Category Name
                  </p>
                  <p className="text-lg text-gray-600">{category.name}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                    Created Date
                  </p>
                  <p className="text-xs text-gray-600">
                    {dayjs(category.created_at).format("DD MMM YYYY, HH:mm")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-gray-600 text-sm">
                  {category.description || "No description provided."}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <CustomButton
                  label="View Sub Category"
                  icon={<EyeOutlined />}
                  onClick={() =>
                    router.push(
                      `/admin/subCategories/${category.category_id}&${category.name}`
                    )
                  }
                />
              </div>
            </CommonCard>
          ))}
        </div>
      )}

      <CategoryModal
        open={isModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
      />

      <WarningModal
        open={isDeleteOpen}
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
};

export default CategoryData;
