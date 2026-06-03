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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    responseBody = JSON.stringify(persons);
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person);
      } else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  Person.find({ name: body.name })
    .then((persons) => {
      if (persons.length > 0)
        return response.status(400).json({
          error: "name must be unique",
        });
    })
    .catch((error) => next(error));

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  Person.findByIdAndUpdate(
    request.params.id,
    {
      name: body.name,
      number: body.number,
    },
    { returnDocument: "after" },
  )
    .then((person) => {
      return response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      return response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (request, response) => {
  const date = new Date();

  response.send(
    `<div>Phonebook has info for ${persons.length} people</div><div>${date.toString()}</div>`,
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// Must be used last for error handling to work!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
