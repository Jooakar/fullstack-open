import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed connecting to MongoDB", err.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: [true, "Name must be unique"],
    required: [true, "Name required"],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, "Phone number required"],
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: props => `${props.value} is not a valid phone number`,
    }
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
