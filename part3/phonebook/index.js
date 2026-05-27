import express, { response } from "express";
import morgan from "morgan";

const app = express();

let responseBody;

app.use(express.json());

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

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  responseBody = JSON.stringify(persons);
  response.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
