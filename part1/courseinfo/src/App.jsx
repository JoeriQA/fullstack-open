const course = "Half Stack application development";
const part1 = "Fundamentals of React";
const exercises1 = 10;
const part2 = "Using props to pass data";
const exercises2 = 7;
const part3 = "State of a component";
const exercises3 = 14;

const Header = (props) => {
  console.log(props);
  return <h1>{props.title}</h1>;
};

const Part = (props) => {
  console.log("Part props: " + props);
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

const Content = () => {
  return (
    <>
      <Part name={part1} number={exercises1} />
      <Part name={part2} number={exercises2} />
      <Part name={part3} number={exercises3} />
    </>
  );
};

const Total = (props) => {
  console.log();
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Header title={course} />
      <Content />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
