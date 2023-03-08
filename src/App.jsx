import axios from 'axios';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import { toggleDarkMode, LSG } from './assets/JS/App-localStorage';
import Loader from './components/Loader/Loader';

function App() {
  // Latitude and Longitude
  const [lat, setLat] = useState();
  const [lon, setLong] = useState();

  const [i, setI] = useState('F');

  //Props
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [icon, setIcon] = useState();
  const [temperature, setTemperature] = useState();
  const [main, setMain] = useState();
  const [description, setDescription] = useState();

  // changing F to C word and reverse
  const changeWord = () => {
    if (i === 'F') {
      setI('C');
      const fahrenheit = (temperature * 9) / 5 + 32;
      setTemperature(Math.round(fahrenheit));
    } else if (i === 'C') {
      setI('F');
      const celsius = ((temperature - 32) * 5) / 9;
      setTemperature(Math.round(celsius));
    }
  };

  // function for Getting information from weather API
  const getWeather = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${navigator.language.slice(
          0,
          2,
        )}&appid=2b3c7e3d7560fcbf6b380d15e17c8324`,
      );
      const data = await res.data;
      //calling "setInfo" function
      setInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  // function for Setting values for props
  const setInfo = (data) => {
    setCountry(data.sys.country);
    setCity(data.name);
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
    const temp = data.main.temp;
    const tempCel = temp - 273.15;
    setTemperature(tempCel.toFixed(0));
    setMain(data.weather[0].main);
    setDescription(data.weather[0].description);
    LSG();
  };

  // Asking for permission for getting location
  useEffect(() => {
    if (navigator.geolocation) {
      //check if geolocation is available
      navigator.geolocation.getCurrentPosition((position) => {
        setTimeout(() => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        }, 5000);
      });
    }
  }, []);

  // getting values for lat and lon by using "getWeather" function
  useEffect(() => {
    getWeather(lat, lon);
  }, [lat, lon]);

  return (
    <div className="App mx-auto min-w-[318px] min-h-[550px] h-screen flex flex-col gap-9 items-center justify-evenly relative">
      {!lat && !lon ? (
        <Loader />
      ) : (
        <>
          <div className=" max-w-[1100px] w-4/5 flex justify-between items-center relative">
            <h1 className="font-semibold text-[19px] text-[#FFFFFF] hover:scale-125 transition">
              Weather App
            </h1>
            <div className="w-[50px] h-6 rounded-2xl bg-[#FFFFFF] flex items-center py-1 px-1 relative active:animate-pulse hover:scale-125 transition">
              <button
                onClick={toggleDarkMode}
                id="round"
                className="w-5 h-5 rounded-[51%] bg-[#53388F] absolute"
              ></button>
            </div>
          </div>
          <Info
            country={country}
            city={city}
            icon={icon}
            temperature={temperature}
            main={main}
            description={description}
          />
          <button
            onClick={changeWord}
            className="active:animate-pulse dark:bg-[#7D69F1] dark:active:bg-[#5640d3] relative bottom-16 transition active:scale-90 active:bg-[#0f76ad] shadow-md shadow-gray-500 ]text-lg bg-[#38A1D8] py-2 px-8 rounded-[9px] text-[#FFFFFF]"
          >
            Cambiar a {i}°
          </button>
        </>
      )}
    </div>
  );
}

export default App;
