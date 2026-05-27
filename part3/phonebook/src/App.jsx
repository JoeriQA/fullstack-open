import { useState, useEffect } from "react";
import personService from "./services/persons";
import AddNumberForm from "./AddNumberForm";
import NumberList from "./NumberList";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  return (
    <div>
      <h2>Phone book</h2>
      <Notification message={successMessage} type={"notification"} />
      <Notification message={errorMessage} type={"error"} />
      <AddNumberForm
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <NumberList
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
