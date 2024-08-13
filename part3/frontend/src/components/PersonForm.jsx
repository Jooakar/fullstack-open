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

export default PersonForm;
