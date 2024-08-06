import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ stat, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total <= 0) {
    return <p>No feedback given</p>;
  }
  const avg = ((good - bad) / total).toFixed(2);
  const positive = ((good / total) * 100).toFixed(2);
  return (
    <table>
      <tbody>
        <StatisticsLine stat={good} text="good" />
        <StatisticsLine stat={neutral} text="neutral" />
        <StatisticsLine stat={bad} text="bad" />
        <StatisticsLine stat={total} text="all" />
        <StatisticsLine stat={avg} text="average" />
        <StatisticsLine stat={`${positive} %`} text="positive" />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>Stats</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
