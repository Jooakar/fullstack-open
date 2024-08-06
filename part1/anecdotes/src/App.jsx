import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randomize = () => {
    let selection;
    // getting the same quote twice would be rather boring
    do {
      selection = Math.floor(Math.random() * anecdotes.length);
    } while (selection === selected);
    setSelected(selection);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };

  const bestIndex = votes.reduce(
    (best, _, i) => (votes[i] > votes[best] ? i : best),
    0,
  );
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => vote()}>vote</button>
      <button onClick={() => randomize()}>next anecdote</button>
      <h1>Top anecdote</h1>
      <p>{anecdotes[bestIndex]}</p>
      <p>has {votes[bestIndex]} votes</p>
    </div>
  );
};

export default App;
