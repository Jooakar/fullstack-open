import express from "express";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/person.js";

const app = express();
app.use(express.json());
morgan.token("json", (req, _) => (req.body ? JSON.stringify(req.body) : ""));
app.use(
  morgan(
    '[:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms :json',
  ),
);
app.use(cors());
app.use(express.static("dist"));

app.get("/info", (request, response) => {
  const count = Person.countDocuments()
    .then((count) => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${Date()}</p>
      `);
    })
    .catch((e) =>
      response
        .status(500)
        .json({ error: "Connection to database failed" })
        .end(),
    );
});

app.get("/api/persons", (request, response) => {
  const persons = Person.find().then((res) => response.json(res));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "Person missing either name or number",
    });
  }
  Person.exists({ name: body.name }).then(console.log).catch(console.log);
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((res) => response.json(res));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = Person.findById(id);
  if (person) {
    response.json(person);
  } else {
    console.log("No person found");
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then(() => console.log("Removal success"));
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
