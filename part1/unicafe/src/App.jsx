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
  return (
    <div>
      <h1>statistics</h1>
      <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
      </div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <FeedbackForm
        onClick={[handleGoodClick, handleNeutralClick, handleBadClick]}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
