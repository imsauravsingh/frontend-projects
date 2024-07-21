import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Autocomplete from "./component/autocomplete";

const staticData = ["apple", "banana", "berrl", "orange", "mango"];

function App() {
  const [select, setSelect] = useState("");

  const fetchSuggestion = async (query) => {
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + query
    );
    if (!response.ok) {
      throw new Error("Network response was not ok!");
    }
    const result = await response.json();
    return result.recipes || [];
  };

  return (
    <div>
      <h1>Typeahead Autocomplete</h1>
      <Autocomplete
        placeholder={"enter recipe"}
        // staticData={staticData}
        fetchSuggestion={fetchSuggestion}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
