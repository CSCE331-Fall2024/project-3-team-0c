"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css'; 


/*
* Home welcome page with weather info included.
*/
const HomePage = () => {
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
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
            const data = await response.json();

            // Set the weather state with the fetched data
            setWeather(data.current);
          },
          (err) => {
            setError('Unable to retrieve your location');
          }
        );
      } catch (err) {
        setError('Error fetching weather data');
      }
    };

    fetchWeather();
    // Load the Google Translate script dynamically
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the Google Translate widget
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'es,fr,de,it,pt', // Add languages you want to support
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      }, 'google_translate_element');
    };

    return () => {
      document.body.removeChild(script); // Clean up script on component unmount
    };

  }, []); // Empty dependency array to run once when the component mounts



  return (
    <div className={styles.container}>
      
      <Image
        src="/photos/pandaLogo.png" // Make sure the image exists under /public/photos/
        alt="Panda Express Logo"
        className={styles.logo} // Use the CSS module class for logo
        width={300} 
        height={300} 
      />
      <h1 className={styles.title}>All Aboard The Panda Express!</h1>

      {/* Display weather data or error message */}
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : weather ? (
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherTitle}>Current Weather</h2>
          <p>Temperature: {weather.temperature_2m}°C</p>
          <p>Wind Speed: {weather.wind_speed_10m} m/s</p>
          <p>Humidity: {weather.relative_humidity_2m}%</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/CustomerView" className={styles.button}>Start an Order</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/MenuBoardView" className={styles.button}>View Menu Board</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/loginGUI" className={styles.button}>Log in Manager/Cashier</Link> 
          </li> 
        </ul>
      </nav>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default HomePage;
