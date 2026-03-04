import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const FeedbackForm = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={props.onClick[0]} text={"good"} />
        <Button onClick={props.onClick[1]} text={"neutral"} />
        <Button onClick={props.onClick[2]} text={"bad"} />
      </div>
    </div>
  );
};

const StatisticsLine = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value} {props.optionalText}
      </p>
    </div>
  );
};

const Statistics = (props) => {
  if (props.total > 0)
    return (
      <div>
        <h1>statistics</h1>
        <div>
          <StatisticsLine text={"good"} value={props.good} />
          <StatisticsLine text={"neutral"} value={props.neutral} />
          <StatisticsLine text={"bad"} value={props.bad} />
          <StatisticsLine text={"total"} value={props.total} />
          <StatisticsLine text={"average"} value={props.average} />
          <StatisticsLine
            text={"positive"}
            value={props.positive}
            optionalText={"%"}
          />
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
