"use client";
import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import UnitData from "./UnitData";
import CreateUnit from "./CreateUnit";
import { Plus } from "lucide-react";
export default function Unit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-end">
          <CustomButton
            label="Add Unit"
            icon={<Plus />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <CreateUnit open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="mt-3">
          <UnitData />
        </div>
      </div>
    </>
  );
}
