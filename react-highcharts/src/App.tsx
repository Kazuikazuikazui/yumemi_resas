import React from "react";
import Main from "./pages/Main";

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>都道府県別人口推移グラフ</h1>
      </header>
      <Main />
    </div>
  );
};

export default App;