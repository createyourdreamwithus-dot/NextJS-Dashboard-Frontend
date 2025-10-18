"use client";
import React from "react";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, {
  FormField,
} from "@/app/components/main/Ui/CustomModal/FormModal";
import {
  CreateSubCategory,
  UpdateSubCategory,
} from "@/hooks/Category/SubcategoryApi";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: any;
  slug?: string;
}

const SubCategoryCreate: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  category,
  slug,
}) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const createMutation = CreateSubCategory();
  const updateMutation = UpdateSubCategory();

  const getParentIdFromSlug = (slug: string): string => {
    if (!slug) return "";
    const decodedSlug = decodeURIComponent(slug);
    const parentId = decodedSlug.split("&")[0] || "";
    return parentId;
  };

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Sub Category Name",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter Description",
      rows: 5,
      required: true,
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      placeholder: "Enter Display Order",
      required: true,
      min: 1,
    },
  ];

  const validateForm = (values: any): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required) {
        const value = values[field.name];

        if (value === null || value === undefined || value === "") {
          newErrors[field.name] = `${field.label} is required`;
        } else if (field.type === "number" && value < (field.min || 0)) {
          newErrors[field.name] = `${field.label} must be at least ${
            field.min || 0
          }`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (values: any) => {
    if (!validateForm(values)) {
      openNotification("error", "Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const parentId = getParentIdFromSlug(slug || "");

      let res;
      if (category) {
        res = await updateMutation.mutateAsync({
          subcategory_id: category.category_id,
          name: values.name,
          description: values.description,
          display_order: values.displayOrder,
          parent_id: parentId,
        });
      } else {
        res = await createMutation.mutateAsync({
          name: values.name,
          description: values.description,
          display_order: values.displayOrder,
          parent_id: parentId,
        });
      }

      openNotification(
        "success",
        res?.message ||
          (category ? "Subcategory updated!" : "Subcategory created!")
      );
      setErrors({});
      onClose();
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        "Operation failed.";

      openNotification("error", apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={category ? "Edit Sub Category" : "Add Sub Category"}
      fields={fields}
      loading={loading}
      okText={category ? "Update" : "Save"}
      initialValues={
        category
          ? {
              name: category.name,
              description: category.description,
              displayOrder: category.display_order,
            }
          : undefined
      }
      errors={errors}
    />
  );
};

export default SubCategoryCreate;
