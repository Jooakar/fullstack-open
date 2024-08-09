import axios from "axios";
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
const imgUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const getCity = async (city) => {
  return axios.get(`${baseUrl}&q=${city}&units=metric`).then((res) => {
    console.log(res);
    const data = res.data;
    const weather = data.weather[0];
    return {
      wind: data.wind.speed,
      temp: data.main.temp,
      img: imgUrl(weather.icon),
    };
  });
};

export default { getCity };
