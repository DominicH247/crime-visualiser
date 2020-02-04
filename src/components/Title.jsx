import React from "react";
import MagnifyingGlass from "../images/loupe.svg";

const Title = () => {
  return(
  <div>
  <h1> Crime Finder </h1>
  <img className="magnifying-img" src={MagnifyingGlass} alt="magnifying-glass"></img>
  <p>Please enable location services</p>
  </div> 
  )
};

export default Title;
