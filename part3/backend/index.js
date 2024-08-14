import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/person.js";

const app = express();
morgan.token("json", (req, _) => (req.body ? JSON.stringify(req.body) : ""));
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    '[:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms :json',
  ),
);

const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed ID" });
  } else {
    return response.status(500).send({ error: "Unexpected exception" });
  }
};

app.use(errorHandler);

app.get("/info", (request, response, next) => {
  const count = Person.countDocuments()
    .then((count) => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${Date()}</p>
      `);
    })
    .catch((err) => next(err));
});

app.get("/api/persons", (request, response, next) => {
  Person.find()
    .then((res) => response.json(res))
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (!body || !body.name || !body.number) {
    return response.status(400).send({
      error: "Person missing either name or number",
    });
  }
  Person.exists({ name: body.name })
    .then((res) => {
      if (res) {
        return response.status(400).send({
          error: "Person already exists",
        });
      }
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person
        .save()
        .then((res) => response.json(res))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return response.json(person);
      }
      return response.status(404).send({ error: "Could not find person" });
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  if (!body || !body.name || !body.number) {
    return response.status(400).send({
      error: "Person missing either name or number",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person)
    .then((previous) => {
      if (previous) {
        return response.send({ id: previous.id, ...person });
      }
      return response.status(404).send({
        error: "Could not find person with ID",
      });
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((err) => next(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
