import React from "react";
import PrefectureList from "../components/PrefectureList";
import Graph from "../components/Graph";

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