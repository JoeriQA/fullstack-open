import { useState, useEffect } from "react";
import axios from "axios";
import AddNumberForm from "./AddNumberForm";
import NumberList from "./NumberList";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phone book</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <NumberList persons={persons} />
    </div>
  );
};

export default App;
