import { useEffect, useState } from "react";
import phonebook from "./services/phonebook";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Message from "./components/Message";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ content: "", type: "success" });
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const createMessage = (msg, type) => {
    setMessage({ type: type, content: msg });
    setTimeout(() => setMessage({ type: type, content: "" }), 5000);
  };

  useEffect(() => {
    phonebook
      .getAll()
      .then(setPersons)
      .catch((err) => alert("Could not get persons: " + err.response.data.error));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedPerson = persons.find((p) => p.name === newPerson.name);

    const ok = updatedPerson
      ? confirm(`Person name ${newPerson.name} already exists, replace number?`)
      : false;
    if (updatedPerson && ok) {
      phonebook
        .update({ ...updatedPerson, number: newPerson.number })
        .then((updated) => {
          setPersons(persons.map((p) => (p.id === updated.id ? updated : p)));
          setNewPerson({ name: "", number: "" });
          createMessage(`Successfully updated ${updated.name}`, "success");
        })
        .catch((err) => {
          console.log(err);
          createMessage("Could not update person: " + err.response.data.error, "error");
        });
    } else {
      phonebook
        .add(newPerson)
        .then((added) => {
          setPersons(persons.concat(added));
          setNewPerson({ name: "", number: "" });
          createMessage(`Successfully added ${added.name}`, "success");
        })
        .catch((err) => {
          console.log(err);
          createMessage("Could not add person: " + err.response.data.error, "error");
        });
    }
  };

  const removePerson = (person) => {
    if (!confirm(`Remove ${person.name}?`)) {
      return;
    }
    phonebook
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        createMessage(`Successfully deleted ${person.name}`, "success");
      })
      .catch((err) => {
        createMessage("Could not remove person: " + err.response.data.error, "error");
      });
  };

  return (
    <div>
      <Message {...message} />
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
