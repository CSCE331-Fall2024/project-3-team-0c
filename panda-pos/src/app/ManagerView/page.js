/**
     * @file ManagerView
     * @description sets up format and functionality of the manager view navigation
     * @author Adarsh Vadlapatla, Jaden Ninan
     */
"use client";
import styles from "./manager.module.css"
import React from 'react';
import { useEffect, useState } from 'react';

/**
 * @function ManagerView
 * @description The main navigation page format for manager view
 * @author Jaden Ninan
 */
function ManagerView() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get the current position of the user (latitude and longitude)
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch weather data from Open-Meteo API
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,wind_speed_10m`);
            const data = await response.json();

            // Set the weather state with the fetched data
            setWeather(data.current);
          },
          (err) => {
            setError('Unable to retrieve your location');
          }
        );
      } catch (err) {
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Manager Dashboard</h1>

      <div className={styles.navMenu}>
        <p className={styles.weathertext}>
          {weather?.temperature_2m ? (
            <>
              Note for Manager: It's {((weather.temperature_2m * 9 / 5) + 32).toFixed(1)}°F outside.{" "}
              {((weather.temperature_2m * 9 / 5) + 32) < 55
                ? "It's chilly, so people might prefer comfort food to warm up!"
                : "It's warm, but people might still crave something!"}
            </>
          ) : (
            <span className={styles.weathertext}>Loading weather data...</span>
          )}
        </p>


        <a href="/EmployeeManagement" className={styles.navButton}>Employee Management</a>
        <a href="/EditPrice_Inventory_MenuView" className={styles.navButton}>Database Editor Dashboard</a>
        <a href="/ReportsView" className={styles.navButton}>View Data Reports</a>
      </div>

      <footer className={styles.footer}>
        <a href="/" className={styles.link}>Back to Home</a>
      </footer>
    </div>
  );
}

export default ManagerView;
