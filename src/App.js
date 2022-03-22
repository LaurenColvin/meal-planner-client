import "./App.css";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import RecipeFeed from "./RecipeFeed/RecipeFeed";
import ScrollTop from "./ScrollTop/ScrollTop";

let urlBase = "http://localhost:3000";

function App() {

  return (
    <div className="App">
      <Link to='/recipe-feed'><h1>Meal Planner</h1></Link>
      <ScrollTop>
        <Routes>
          <Route path="/recipe-feed" element={<RecipeFeed urlBase={urlBase}/>}/>
        </Routes>
      </ScrollTop>
    </div>
  );
}

export default App;
