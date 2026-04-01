import personService from "./services/persons";

const PersonRow = ({ person, persons, setPersons }) => {
  const handleDeleteClick = () => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  );
};

export default PersonRow;
