const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part {...part} key={part.id} />);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

export default Course;
