"use client";
import React from "react";
import { Modal, Input, InputNumber, Button, Select, Checkbox } from "antd";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  min?: number;
  options?: Array<{ value: any; label: string }>;
  initialValue?: any;
};

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
  title?: string;
  fields: FormField[];
  loading?: boolean;
  okText?: string;
  initialValues?: Record<string, any>;
  headerBgColor?: string;
  errors?: Record<string, string>;
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  loading = false,
  okText = "Save",
  initialValues,
  errors = {},
}) => {
  const [formValues, setFormValues] = React.useState<Record<string, any>>(
    initialValues || {}
  );

  React.useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    } else {
      setFormValues({});
    }
  }, [initialValues, open]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOk = () => {
    onSubmit(formValues);
  };

  const renderField = (field: FormField) => {
    const error = errors[field.name];
    const status = error ? "error" : undefined;

    switch (field.type) {
      case "textarea":
        return (
          <>
            <Input.TextArea
              placeholder={field.placeholder}
              rows={field.rows || 4}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg"
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          </>
        );
      case "number":
        return (
          <>
            <InputNumber
              placeholder={field.placeholder}
              value={formValues[field.name] || ""}
              onChange={(value) => handleChange(field.name, value)}
              min={field.min || 0}
              className="w-full rounded-lg"
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          </>
        );
      case "select":
        return (
          <>
            <Select
              showSearch
              labelInValue
              placeholder={field.placeholder || "Select an option"}
              optionFilterProp="label"
              options={field.options}
              value={formValues[field.name] || undefined}
              onChange={(value) => handleChange(field.name, value)}
              className="rounded-lg"
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          </>
        );
      case "checkbox":
        return (
          <Checkbox
            checked={formValues[field.name] || false}
            onChange={(e) => handleChange(field.name, e.target.checked)}
          >
            {field.label}
          </Checkbox>
        );
      default:
        return (
          <>
            <Input
              placeholder={field.placeholder}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="rounded-lg"
              status={status}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
          </>
        );
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="space-y-4 mt-4">
        {fields.map((field) => {
          if (field.type === "checkbox") {
            return (
              <div key={field.name}>
                {renderField(field)}
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          );
        })}

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            disabled={loading}
            loading={loading}
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;