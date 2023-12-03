import React from "react";
import SearchBar from "../SearchBar";
import Table from "../Table";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="homeContainer">
      <SearchBar />
      <Table />
      <Footer />
    </div>
  );
};

export default Home;
