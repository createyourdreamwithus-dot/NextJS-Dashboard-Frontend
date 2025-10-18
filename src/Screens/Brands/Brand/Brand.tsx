"use client";
import React, { useState } from "react";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import { Input, Col } from "antd";
import BrandData from "./BrandData";
import CreateBrand from "./CreateBrand";
import { Plus } from "lucide-react";
export default function Brand() {
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between">
          {/* <Col xs={8} sm={8} md={8} lg={8}>
            <Search
              placeholder="Search Brands..."
              allowClear
              enterButton="Search"
              size="large"
              //   onSearch={onSearch}
            />
          </Col> */}
          <CustomButton
            label="Add Unit"
            icon={<Plus />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <CreateBrand open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="mt-3">
          <BrandData />
        </div>
      </div>
    </>
  );
}
