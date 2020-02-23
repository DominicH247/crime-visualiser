import React from "react";
import "./App.css";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="main-title">
        <Title />
      </header>
      <section>
        <SearchBar />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
