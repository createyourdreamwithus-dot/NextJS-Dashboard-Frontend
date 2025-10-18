"use client";
import React from "react";
import { CreateBrands, UpdateBrand  } from "@/hooks/Brand/BrandApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, {
  FormField,
} from "@/app/components/main/Ui/CustomModal/FormModal";

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  brands?: any;
}

const BrandModal: React.FC<BrandModalProps> = ({ open, onClose, brands }) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const createMutation = CreateBrands();
  const updateMutation = UpdateBrand();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Brand name",
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
  ];

  const validateForm = (values: any): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required) {
        const value = values[field.name];

        if (value === null || value === undefined || value === "") {
          newErrors[field.name] = `${field.label} is required`;
        } else if (
          field.type === "select" &&
          (!value.value || value.value === "")
        ) {
          newErrors[field.name] = `${field.label} is required`;
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
      if (brands) {
        res = await updateMutation.mutateAsync({
          brand_id: brands.brand_id,
          values,
        });
      } else {
        res = await createMutation.mutateAsync(values);
      }

      openNotification(
        "success",
        res?.message || (brands ? "Brand updated!" : "Brand created!")
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

  const initialValues = brands
    ? {
        name: brands.name,
        description: brands.description,
      }
    : undefined;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={brands ? "Edit Brand" : "Add New Brand"}
      fields={fields}
      loading={loading}
      okText={brands ? "Update" : "Save"}
      initialValues={initialValues}
      errors={errors}
    />
  );
};

export default BrandModal;
