import { useState } from "react";
import PersonRow from "./PersonRow";

const NumberList = ({ persons, setPersons }) => {
  const [filteredList, setFilteredList] = useState([]);

  function filterNumbers(event) {
    const filterString = String(event.target.value).toLocaleLowerCase();
    setFilteredList(
      persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filterString),
      ),
    );
  }

  return (
    <div>
      <h2>Numbers</h2>
      <div>
        filter shown with <input onChange={filterNumbers} />
      </div>
      <div>
        {filteredList.length > 0
          ? filteredList.map((person) => (
              <PersonRow
                key={person.id}
                person={person}
                persons={persons}
                setPersons={setFilteredList}
              />
            ))
          : persons.map((person) => (
              <PersonRow
                key={person.id}
                person={person}
                persons={persons}
                setPersons={setPersons}
              />
            ))}
      </div>
    </div>
  );
};

export default NumberList;
