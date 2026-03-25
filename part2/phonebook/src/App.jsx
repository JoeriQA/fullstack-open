import { useState } from "react";
import AddNumberForm from "./AddNumberForm";
import NumberList from "./NumberList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  return (
    <div>
      <h2>Phone book</h2>
      <AddNumberForm persons={persons} setPersons={setPersons} />
      <NumberList persons={persons} />
    </div>
  );
};

export default App;
