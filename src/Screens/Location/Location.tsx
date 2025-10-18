import CustomTabs from "@/app/components/main/Ui/CustomTabs/CustomTabs";
import React from "react";
import Countries from "./Countries/Countries";
import States from "./States/States";
import Districts from "./Districts/Districts";

const Location = () => {
  const tabItems = [
    { key: "1", label: "Countries", children: <Countries /> },
    { key: "2", label: "States", children: <States /> },
    { key: "3", label: "Districts", children: <Districts /> },
  ];

  return (
    <div>
      <CustomTabs tabs={tabItems} defaultActiveKey="1" />
    </div>
  );
};

export default Location;
