import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Props = {
  src: string;
  href: string;
};
type WeatherData = {
  city: string;
  temperature: string;
  description: string;
  humidity: string;
  windSpeed: string;
};
function Logo({ src, href }: Props) {
  console.info("props", src, href);

  return (
    <a href={href} target="_blank">
      <img src={src} className="logo" alt="Vite logo" />
    </a>
  );
}
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<WeatherData>({
    city: "",
    temperature: "",
    description: "",
    humidity: "",
    windSpeed: "",
  });
  // useState = firstname", "setFirstName"
  // 2 parameters: function (callback), dependecies
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetch(
        "http://localhost:4052/api/weather/?city=dsdds"
      );
      const res = await fetchedData.json();
      setData(res);
      console.log("res", res);
      console.log("data", data);
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function addCount() {
    setCount(count + 1);
  }
  return (
    <>
      <div>
        <Logo src={reactLogo} href="https://react.dev" />
        <Logo src={viteLogo} href="https://vite.dev" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={addCount}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">
        {data && data?.city
          ? `Weather data for ${data.city}`
          : "No weather data available"}
      </p>
      <p className="read-the-docs">
        {/* Weather in London: {data.temperature}°C, {data.description} */}
      </p>
    </>
  );
}
export default App;
