import { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
    id: persons.at(-1).id + 1,
  });
  const [filter, setFilter] = useState("");

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
