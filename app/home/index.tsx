import { router, Stack } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HomePage = () => {
  const imageSrc = require('../../assets/images/img4.jpg')
  const imageSrc2 = require('../../assets/images/img5.png')
  const imageSrc3 = require('../../assets/images/search.png')
  const imageSrc4 = require('../../assets/images/weather.png')
  const imageSrc5 = require('../../assets/images/wind.png')
  const imageSrc6 = require('../../assets/images/humidity.png')
  const imageSrc7 = require('../../assets/images/sunrise.png')
  const imageSrc8 = require('../../assets/images/sunset.png')
  const imageSrc9 = require('../../assets/images/pressure.png')
  const clear = require('../../assets/images/clear.jpg')
  const cloud = require('../../assets/images/cloud.jpg')
  const thunderstorm = require('../../assets/images/thunderstorm.jpg')
  const rain = require('../../assets/images/rain.jpg')
  const snow = require('../../assets/images/snow.jpg')
  const mist = require('../../assets/images/mist.jpg')
  const haze = require('../../assets/images/haze.jpg')
  const loadingImg = require('../../assets/images/loader.png')
  const errorImg = require('../../assets/images/error.png')

  const backgroundChanger = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return clear
      case 'cloud':
        return cloud
      case 'thunderstorm':
        return thunderstorm
      case 'rain':
        return rain
      case 'snow':
        return snow
      case 'mist':
        return mist
      case haze:
        return haze
      default:
        return imageSrc
    }
  }

  // Define the type for the API response
  interface WeatherData {
    name: string
    sys: {
      country: string
      sunrise: number
      sunset: number
    }
    weather: [
      {
        main: string
        description: string
      },
    ]
    main: {
      temp: number
      pressure: number
      humidity: number
    }
    wind: {
      speed: number
    }
  }

  // Use the WeatherData type for responseData state
  const [searchInput, setSearchInput] = useState('Jabalpur')
  const [responseData, setResponseData] = useState<WeatherData | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'weather-sunny'
      case 'clouds':
        return 'weather-cloudy'
      case 'rain':
        return 'weather-rainy'
      case 'thunderstorm':
        return 'weather-lightning'
      case 'snow':
        return 'weather-snowy'
      case 'mist':
      case 'haze':
        return 'weather-fog'
      default:
        return 'weather-sunny' // Default icon
    }
  }

  const fetchWeatherData = async () => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=ccc441838d882f22ed1c920c95f4b7d2`

    try {
      setLoading(true)
      const response = await fetch(api)
      const jsonData: WeatherData = await response.json()
      setResponseData(jsonData)
      setLoading(false)
    } catch (error) {
      console.log('Error fetching data: ', error)
      setIsError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  if (isLoading) {
    return (
      <>
      <Stack.Screen options={{headerShown:false}}/>
      <ImageBackground source={loadingImg}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </ImageBackground>
      </>

    )
  }

  if (isError || !responseData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching data</Text>
        <Image source={errorImg} />
      </View>
    )
  }

  const kelvinToCelsius = (temp: number) => Math.round(temp - 273.15)

  const pressureInKPa = (pressure: number) => (pressure / 10).toFixed(2)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity style={styles.backBtnContainer} onPress={() => router.back()}>
              <Image style={styles.backBtn} source={imageSrc2} />
            </TouchableOpacity>
          ),
        }}
      />
      <ImageBackground style={styles.backgroundImage} source={backgroundChanger(responseData.weather[0].main)}>
        <View style={styles.overlay} />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <TextInput
                onChangeText={(text) => setSearchInput(text)}
                value={searchInput}
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity onPress={fetchWeatherData}>
                <Image source={imageSrc3} style={styles.searchBtn} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.main}>
            <View style={styles.mainSection}>
              <Text style={{ fontSize: 45, color: '#FFF', marginBottom: hp('5') }}>
                {responseData.name}, {responseData.sys.country}
              </Text>
              <MaterialCommunityIcons
                name={getWeatherIcon(responseData.weather[0].main)}
                size={100}
                color="#FFF"
                style={styles.weatherIcon}
              />
              <Text style={{ fontSize: 35, color: '#FFF', fontWeight: 'bold' }}>
                {responseData.weather[0].description}
              </Text>
              <View style={styles.insideContainer}>
                <View style={styles.insider}>
                  <Image source={imageSrc5} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {responseData.wind.speed} km/h
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Wind speed</Text>
                </View>
                <View style={styles.insider}>
                  <Image source={imageSrc6} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {responseData.main.humidity} %
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Humidity</Text>
                </View>
                <View style={styles.insider}>
                  <Image source={imageSrc5} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {kelvinToCelsius(responseData.main.temp)}°C
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Temperature</Text>
                </View>
              </View>
              <View style={styles.insideContainer}>
                <View style={styles.insider}>
                  <Image source={imageSrc7} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {formatTime(responseData.sys.sunrise)}Am
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Sunrise</Text>
                </View>
                <View style={styles.insider}>
                  <Image source={imageSrc8} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {formatTime(responseData.sys.sunset)} Pm
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Sunset</Text>
                </View>
                <View style={styles.insider}>
                  <Image source={imageSrc9} style={styles.insiderImage} />
                  <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {pressureInKPa(responseData.main.pressure)} kPa
                  </Text>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Pressure</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 43, 43, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1.8,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    height: hp('6%'),
    width: wp('80%'),
    borderWidth: 2,
    borderRadius: 30,
    padding: wp('2.5%'),
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  backBtnContainer: {
    paddingLeft: wp('1%'),
  },
  backBtn: {
    height: hp('3.5%'),
    width: wp('7%'),
  },
  searchBtn: {
    height: hp('3.5%'),
    width: wp('7%'),
  },
  searchInput: {
    width: wp('60%'),
    height: hp('4%'),
    color: '#fff',
    fontSize: 20,
    marginLeft: wp('3%'),
  },
  main: {
    flex: 4,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('-10%'),
    marginBottom: hp('10%'),
  },
  mainSection: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  weatherImage: {
    height: hp('20%'),
    width: wp('60%'),
  },
  insideContainer: {
    width: wp('85%'),
    margin: wp('5%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
  insider: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: wp('5%'),
  },
  insiderImage: {
    height: hp('5%'),
    width: wp('11%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomePage
