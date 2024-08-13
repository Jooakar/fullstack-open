const Person = ({ name, number, removePerson }) => (
  <div>
    <p>
      {name} {number}
    </p>
    <input type="button" onClick={removePerson} value="delete" />
  </div>
);

export default Person;
