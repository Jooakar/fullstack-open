import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const handle = (req) => {
  return req.then((res) => res.data);
};

const getAll = () => {
  return handle(axios.get(baseUrl));
};

const add = (person) => {
  return handle(axios.post(baseUrl, person));
};

const update = (person) => {
  return handle(axios.put(`${baseUrl}/${person.id}`, person));
};

const remove = (id) => {
  return handle(axios.delete(`${baseUrl}/${id}`));
};

export default { getAll, add, update, remove };
