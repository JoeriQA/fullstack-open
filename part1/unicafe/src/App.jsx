import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const FeedbackForm = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={props.onClick[0]}>good</button>
        <button onClick={props.onClick[1]}>neutral</button>
        <button onClick={props.onClick[2]}>bad</button>
      </div>
    </div>
  );
};

const Statistics = (props) => {
  if (props.total > 0)
    return (
      <div>
        <h1>statistics</h1>
        <div>
          <p>good {props.good}</p>
          <p>neutral {props.neutral}</p>
          <p>bad {props.bad}</p>
          <p>total {props.total}</p>
          <p>average {props.average}</p>
          <p>positive {props.positive} %</p>
        </div>
      </div>
    );
  else
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [average, setAverage] = useState(0);

  const total = good + neutral + bad;
  const positive = (good / total) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
    const newClicks = allClicks.concat(1);

    setAll(newClicks);
    setAverage(
      newClicks.reduce((sum, curr) => sum + curr, 0) / newClicks.length,
    );
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    const newClicks = allClicks.concat(0);
    setAll(newClicks);
    setAverage(
      newClicks.reduce((sum, curr) => sum + curr, 0) / newClicks.length,
    );
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    const newClicks = allClicks.concat(-1);

    setAll(newClicks);
    setAverage(
      newClicks.reduce((sum, curr) => sum + curr, 0) / newClicks.length,
    );
  };

  return (
    <div>
      <FeedbackForm
        onClick={[handleGoodClick, handleNeutralClick, handleBadClick]}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
