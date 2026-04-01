import { useState, useEffect } from "react";
import personService from "./services/persons";
import AddNumberForm from "./AddNumberForm";
import NumberList from "./NumberList";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phone book</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <NumberList persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
