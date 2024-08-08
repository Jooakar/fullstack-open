import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
    id: 1,
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .catch((e) => alert(e))
      .then((response) => {
        setPersons(response.data);
        setNewPerson((n) => {
          return { ...n, id: Number(response.data.at(-1).id || 1) + 1 };
        });
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setPersons([...persons, newPerson]);
    setNewPerson({ name: "", number: "", id: newPerson.id + 1 });
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
          <Person {...p} key={p.id} />
        ))}
    </div>
  );
};

export default App;
