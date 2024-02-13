import React from "react";
import ListView from "../components/ListView";
import { data } from "./videodata";
export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-3">Video Player</h1>
      <ListView data={data} />
    </div>
  );
}
