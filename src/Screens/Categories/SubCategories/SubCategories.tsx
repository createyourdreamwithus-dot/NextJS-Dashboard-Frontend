"use client";
import CustomButton from "@/app/components/main/Ui/CustomButton/CustomButton";
import { Plus, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import SubCategoryCreate from "./SubCategoryCreate";
import SubCategoriesData from "./SubCategoriesData";
import { useRouter } from "next/navigation";

const SubCategories = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.split("&")[1] || "";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 p-4 text-lg font-semibold">
          <button
            onClick={() => router.back()}
            className="hover:bg-gray-100 p-2 rounded-full transition"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            Subcategory <span className="text-gray-500">&gt;</span>{" "}
            <span className="text-[#9a16ca]">{name || "No subcategory name"}</span>
          </div>
        </div>

        <div className="flex justify-end pr-4">
          <CustomButton
            label="Add Sub Category"
            icon={<Plus />}
            onClick={() => setIsModalOpen(true)}
          />
          <SubCategoryCreate
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            slug={slug}
          />
        </div>
      </div>

      <div className="mt-3">
        <SubCategoriesData slug={slug} />
      </div>
    </>
  );
};

export default SubCategories;
