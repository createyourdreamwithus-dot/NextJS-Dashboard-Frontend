"use client";

import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CategoryCreate from "./CategoryCreate";
import { Plus } from "lucide-react";
import CategoryData from "./CategoryData";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <CustomButton
          label="Add Category"
          icon={<Plus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <CategoryCreate
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="mt-3">
        <CategoryData />
      </div>
    </div>
  );
};

export default Category;
