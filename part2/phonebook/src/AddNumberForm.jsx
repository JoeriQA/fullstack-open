import personService from "./services/persons";
import { useState } from "react";

const AddNumberForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();

    const personFound = persons.find((person) => person.name === newName);

    if (personFound) {
      if (
        confirm(
          `${newName} is already added to phone book, replace the old number with a new one?`,
        )
      ) {
        const personObject = { name: newName, number: newNumber };

        personService.update(personFound.id, personObject).then(() => {
          setPersons((prevPersons) =>
            prevPersons.map((p) =>
              p.id !== personFound.id ? p : personObject,
            ),
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>add a new</h2>
      <form>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => {
              setNewNumber(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNumberForm;
