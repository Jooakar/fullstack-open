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

export default Filter;
