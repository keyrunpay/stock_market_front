import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <div style={{ transform: "scale(3)" }}>
        <Spin size="large" />
      </div>
    </div>
  );
}
