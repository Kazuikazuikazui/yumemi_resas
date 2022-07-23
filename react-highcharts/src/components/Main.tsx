import React from "react";
import PrefectureList from "./PrefectureList";
import Graph from "./Graph";

const Main: React.FC = () => {
  return (
    <main>
      <h2>メイン</h2>
      <PrefectureList />
      <Graph />
    </main>
  );
};

export default Main;