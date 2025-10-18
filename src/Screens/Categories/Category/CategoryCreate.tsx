"use client";
import React from "react";
import { CreateCategory, UpdateCategory } from "@/hooks/Category/CategoryApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, { FormField } from "@/app/components/main/Ui/CustomModal/FormModal";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: any;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, category }) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const createMutation = CreateCategory();
  const updateMutation = UpdateCategory();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      rows: 5,
      required: true,
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
      placeholder: "Enter display order",
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
          newErrors[field.name] = `${field.label} must be at least ${field.min || 0}`;
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
      let res;
      if (category) {
        res = await updateMutation.mutateAsync({
          ...values,
          category_id: category.category_id,
        });
      } else {
        res = await createMutation.mutateAsync(values);
      }

      openNotification(
        "success",
        res?.message || (category ? "Category updated!" : "Category created!")
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
      title={category ? "Edit Category" : "Add New Category"}
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

export default CategoryModal;