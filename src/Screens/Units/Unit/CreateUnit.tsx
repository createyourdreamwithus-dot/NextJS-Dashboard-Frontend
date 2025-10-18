"use client";
import React from "react";
import { CreateUnits, UpdateUnit } from "@/hooks/Unit/UnitApi";
import { useNotification } from "@/app/components/providers/NotificationProvider";
import FormModal, {
  FormField,
} from "@/app/components/main/Ui/CustomModal/FormModal";

interface UnitModalProps {
  open: boolean;
  onClose: () => void;
  units?: any;
}

const UnitModal: React.FC<UnitModalProps> = ({ open, onClose, units }) => {
  const { openNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const createMutation = CreateUnits();
  const updateMutation = UpdateUnit();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Unit name",
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
      if (units) {
        res = await updateMutation.mutateAsync({
          unit_id: units.unit_id,
          values,
        });
      } else {
        res = await createMutation.mutateAsync(values);
      }

      openNotification(
        "success",
        res?.message || (units ? "Unit updated!" : "Unit created!")
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

  const initialValues = units
    ? {
        name: units.name,
        description: units.description,
      }
    : undefined;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={units ? "Edit Unit" : "Add New Unit"}
      fields={fields}
      loading={loading}
      okText={units ? "Update" : "Save"}
      initialValues={initialValues}
      errors={errors}
    />
  );
};

export default UnitModal;
