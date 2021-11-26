import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import ConnectPolkaBtn from "@/components/connectPolkaBtn";
import "./homeIndex.less";
export default function HomeIndex() {
  return (
    <div className="homeIndex">
      <HeaderWidget />
      <ConnectPolkaBtn />
    </div>
  );
}
