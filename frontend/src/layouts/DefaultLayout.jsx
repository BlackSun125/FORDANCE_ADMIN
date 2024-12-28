import * as React from "react";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="w-screen h-screen overflow-x-auto">
      <div>Header</div>   
      <div className="max-w-full">
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
}
