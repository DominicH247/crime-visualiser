import React from "react";
import "./App.css";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <header>
        <Title />
      </header>
      <section>
        <SearchBar />
      </section>
    </div>
  );
}

export default App;
