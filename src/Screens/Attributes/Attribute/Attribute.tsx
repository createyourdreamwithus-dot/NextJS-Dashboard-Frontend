"use client";
import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import CreateAttribute from "./CreateAttribute";
import { Plus } from "lucide-react";
import AttributeData from "./AttributeData";
export default function Attribute() {
     const [isModalOpen, setIsModalOpen] = useState(false);
  return <>
   <div>
      <div className="flex justify-end">
        <CustomButton
          label="Add Attribute"
          icon={<Plus />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <CreateAttribute
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="mt-3">
        <AttributeData />
      </div>
    </div>
  </>;
}
