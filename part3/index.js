import express from "express";
import morgan from "morgan";
import cors from "cors";

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();
app.use(express.json());
morgan.token("json", (req, _) => (req.body ? JSON.stringify(req.body) : ""));
app.use(
  morgan(
    '[:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms :json',
  ),
);
app.use(cors());

const generateId = () => {
  return Math.floor(Math.random() * 1e9);
};

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
    `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "Person missing either name or number",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    console.log("No person found");
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
