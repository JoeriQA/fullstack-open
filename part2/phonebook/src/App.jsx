import { useState, useEffect } from "react";
import axios from "axios";
import AddNumberForm from "./AddNumberForm";
import NumberList from "./NumberList";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  return (
    <div>
      <h2>Phone book</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <NumberList persons={persons} />
    </div>
  );
};

export default App;
