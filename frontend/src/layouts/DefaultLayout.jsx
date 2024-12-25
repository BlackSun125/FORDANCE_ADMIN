import * as React from "react";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="w-screen h-screen">
      <div>Header</div>   
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
}
