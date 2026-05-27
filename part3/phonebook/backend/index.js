import "dotenv/config";
import express, { response } from "express";
import morgan from "morgan";
import Person from "./models/person.js";
const app = express();

app.use(express.json());
app.use(express.static("dist"));

let responseBody;

morgan.token("body", (res) => {
  return responseBody;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const generateId = () => {
  const id = Math.floor(Math.random() * 1000000);
  return String(id);
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    responseBody = JSON.stringify(persons);
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const nameFound = persons.find((person) => person.name === body.name);
  if (nameFound) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const date = new Date();

  response.send(
    `<div>Phonebook has info for ${persons.length} people</div><div>${date.toString()}</div>`,
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
