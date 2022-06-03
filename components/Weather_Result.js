import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Weather from './Weather';
import SearchBar from './SearchBar';

const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";


export default function Weather_Result() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Kolkata');
    }, [])
    

    if(!loaded) {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </KeyboardAvoidingView>

        )
    }

    else if(weatherData === null) {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </KeyboardAvoidingView>
        )
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});