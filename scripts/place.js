// Footer: current year and last modified date
const today = new Date();
document.getElementById("currentyear").textContent = today.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Static weather values (metric). They match the values shown in the Weather section.
const temperature = 24; // °C
const windSpeed = 12; // km/h

// Wind chill in °C (one-line return)
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Only calculate when temperature <= 10 °C and wind speed > 4.8 km/h
let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + "°C";
}

document.getElementById("windchill").textContent = windChill;