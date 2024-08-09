import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  return axios.get(`${baseUrl}/all`).then((res) => res.data);
};

const getCountry = async (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then((res) => res.data);
};

export default { getAll, getCountry };
