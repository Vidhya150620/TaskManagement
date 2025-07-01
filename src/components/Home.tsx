import { useState } from "react";
import { Quotes, Header, DialogTask, CardView } from "./";

export const Home = () => {

  return (
    <>
      <h2 className="text-primary text-3xl font-medium text-center mt-5 mb-5">Task Management</h2>
      <section>
        <Quotes />
        {/* <TableView /> */}
        <CardView />
      </section>
    </>
  );
};
