import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { isCloud } from "./weatherLogic";

function SavedCities({ onSelectCity }) {
  const [show, setShow] = useState(false);
  const [savedCities, setSavedCities] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    loadSavedCities(); // Обновляем список перед показом
  };

  const loadSavedCities = () => {
    const cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setSavedCities(cities);
  };

  // 📦 Функция отображения сохранённых городов
  const displaySavedCities = () => {
    if (savedCities.length === 0) return <p>Список пуст</p>;

    return savedCities.map((city, index) => (
      <Button
        key={index}
        variant="outline-dark"
        className="w-100 mb-2"
        onClick={() => {
          onSelectCity(city.name);
          handleClose();
        }}
      >
        {city.name},{city.sys.country} <br />{" "}
        {isCloud(city.clouds.all, city.weather[0].main)}{" "}
        <span>{Math.round(city.main.temp - 273.15)}°C</span>
      </Button>
    ));
  };

  return (
    <>
      <Button
        className="mb-3 rounded-pill"
        variant="outline-dark"
        onClick={handleShow}
      >
        Recent cities
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Recent cities</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{displaySavedCities()}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SavedCities;
