"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import CommonCard from "@/app/components/main/CommonCard/CommonCard";
import CustomLoader from "@/app/components/main/Ui/CustomLoader/CustomLoader";
import CustomEmpty from "@/app/components/main/Ui/CustomEmpty/CustomEmpty";
import WarningModal from "@/app/components/main/Ui/WarningModal/WarningModal";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import SubCategoryCreate from "./SubCategoryCreate";
import {
  DeleteSubCategory,
  GetSubCategories,
} from "@/hooks/Category/SubcategoryApi";

interface SubCategoriesDataProps {
  slug: string;
}

const SubCategoriesData: React.FC<SubCategoriesDataProps> = ({ slug }) => {
  const { data, isLoading, isError, error } = GetSubCategories(slug);
  const { openNotification } = useNotification();
  const deleteMutation = DeleteSubCategory();
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

    deleteMutation.mutate(
      {
        subcategory_id: selectedCategory.category_id,
      },
      {
        onSuccess: () => {
          openNotification("success", "Subcategory deleted successfully!");
          setIsDeleteOpen(false);
          setSelectedCategory(null);
        },
        onError: (err: any) => {
          const apiMessage =
            err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            "Operation failed.";

          openNotification("error", apiMessage);
        },
      }
    );
  };

  if (isLoading) return <CustomLoader text="Loading subcategories..." />;

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Failed to load subcategories: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <>
      {!data || data.length === 0 ? (
        <CustomEmpty message="No subcategories available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((category: any) => (
            <CommonCard
              key={category.subcategory_id}
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
                    Subcategory Name
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
            </CommonCard>
          ))}
        </div>
      )}

      <SubCategoryCreate
        open={isModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        slug={slug}
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

export default SubCategoriesData;
