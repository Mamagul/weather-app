import {
  WiDaySunny,
  WiDayCloudy,
  WiDaySunnyOvercast,
  WiCloudy,
  WiDayFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import {
  WiDirectionUp,
  WiDirectionUpRight,
  WiDirectionRight,
  WiDirectionDownRight,
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionLeft,
  WiDirectionUpLeft,
} from "react-icons/wi";

const windDirection = (windDeg) => {
  if (windDeg >= 350 && windDeg <= 10) {
    return { icon: <WiDirectionUp size={40} />, label: "N" };
  } else if (windDeg >= 11 && windDeg <= 80) {
    return { icon: <WiDirectionUpRight size={40} />, label: "NE" };
  } else if (windDeg >= 81 && windDeg <= 100) {
    return { icon: <WiDirectionRight size={40} />, label: "E" };
  } else if (windDeg >= 101 && windDeg <= 170) {
    return { icon: <WiDirectionDownRight size={40} />, label: "SE" };
  } else if (windDeg >= 171 && windDeg <= 190) {
    return { icon: <WiDirectionDown size={40} />, label: "S" };
  } else if (windDeg >= 191 && windDeg <= 260) {
    return { icon: <WiDirectionDownLeft size={40} />, label: "SW" };
  } else if (windDeg >= 261 && windDeg <= 280) {
    return { icon: <WiDirectionLeft size={40} />, label: "W" };
  } else if (windDeg >= 281 && windDeg <= 349) {
    return { icon: <WiDirectionUpLeft size={40} />, label: "NW" };
  }

  return { icon: null, label: "?" }; // На случай ошибки
};
const isCloud = (cloud, main) => {
  if (main.includes("Clouds")) {
    if (cloud <= 30) {
      return <WiDaySunny size={50} />;
    } else if (cloud <= 50) {
      return <WiDaySunnyOvercast size={50} />;
    } else if (cloud <= 70) {
      return <WiDayCloudy size={50} />;
    } else {
      return <WiCloudy size={50} />;
    }
  } else if (main.includes("Rain")) {
    return <WiRain size={50} />;
  } else if (main.includes("Fog")) {
    return <WiDayFog size={50} />;
  } else if (main.includes("Snow")) {
    return <WiSnow size={50} />;
  } else if (main.includes("Thunderstorm")) {
    return <WiThunderstorm size={50} />;
  } else if (main.includes("Clear")) {
    return <WiDaySunny size={50} />;
  }
};

export { windDirection, isCloud };
