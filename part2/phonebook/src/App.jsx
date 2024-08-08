import { useEffect } from "react";
import { useState } from "react";
import phonebook from "./services/phonebook";

const Filter = ({ filter, setFilter }) => (
  <>
    <label htmlFor="filter_input">Filter: </label>
    <input
      id="filter_input"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  </>
);

const PersonForm = ({ person, setPerson, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="name_input">Name: </label>
      <input
        id="name_input"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
    </div>
    <div>
      <label htmlFor="number_input">Number: </label>
      <input
        id="number_input"
        value={person.number}
        onChange={(e) => setPerson({ ...person, number: e.target.value })}
      />
    </div>
    <button type="submit">add</button>
  </form>
);

const Person = ({ name, number, removePerson }) => (
  <div>
    <p>
      {name} {number}
    </p>
    <input type="button" onClick={removePerson} value="delete" />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const initPerson = (id) => ({
    name: "",
    number: "",
    id,
  });

  const [newPerson, setNewPerson] = useState(initPerson(1));

  useEffect(() => {
    phonebook
      .getAll()
      .then((people) => {
        const maxId = people.reduce((best, curr) => Math.max(best, curr.id), 1);
        setPersons(people);
        setNewPerson((p) => ({ ...p, id: maxId + 1 }));
      })
      .catch((err) => alert("Could not get persons: " + err.message));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedPerson = persons.find((p) => p.name === newPerson.name);
    if (
      updatedPerson &&
      confirm(`Person name ${newPerson.name} already exists, replace number?`)
    ) {
      phonebook
        .update({ ...updatedPerson, number: newPerson.number })
        .then((updated) => {
          setPersons(persons.map((p) => (p.id === updated.id ? updated : p)));
          setNewPerson(initPerson(newPerson.id));
        })
        .catch((err) => alert("Could not update person: " + err.message));
      return;
    }
    phonebook.add(newPerson).then((added) => {
      setPersons(persons.concat(added));
      setNewPerson(initPerson(added.id + 1));
    });
  };

  const removePerson = (person) => {
    if (!confirm(`Remove ${person.name}?`)) {
      return;
    }
    phonebook
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch((err) => alert("Could not remove person: " + err.message));
  };

  return (
    <div>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <PersonForm
        person={newPerson}
        setPerson={setNewPerson}
        onSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      {persons
        .filter((p) => p.name.includes(filter))
        .map((p) => (
          <Person {...p} removePerson={() => removePerson(p)} key={p.id} />
        ))}
    </div>
  );
};

export default App;
