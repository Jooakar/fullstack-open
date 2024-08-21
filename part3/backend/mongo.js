import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

switch (process.argv.length) {
case 2:
  Person.find().then((people) => {
    console.log("Phonebook:");
    people.forEach((person) =>
      console.log(`${person.name} ${person.number}`),
    );
    mongoose.connection.close();
  });
  break;
case 4: {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then(() => {
    console.log(
      `Added ${person.name} to phonebook with number ${person.number}`,
    );
    mongoose.connection.close();
  });
  break;
}
default:
  console.log("Invalid number of arguments");
  mongoose.connection.close();
}
