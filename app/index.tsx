// Page.js
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Page = () => {
  const imageSrc = require('../assets/images/img.png');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.section}>
            <Image style={styles.image} source={imageSrc} />
            <View style={styles.titleSectionContainer}>
              <Text style={styles.title}>Discover Your City's Weather</Text>
              <Text style={styles.subTitle}>
                Get instant updates and detailed forecasts for your city, all at your fingertips
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate('home')}
          >
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: wp('100%'),
  },
  main: {
    flex: 4,
    backgroundColor: '#000',
    width: wp('100%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp('40%'),
    width: wp('100%'),
    marginHorizontal: wp('5%'),
  },
  titleSectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginHorizontal: wp('3%'),
    textAlign: 'center',
  },
  title: {
    fontSize: hp('2.6%'),
    color: 'orange',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    width: wp('100%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  button: {
    height: hp('6%'),
    width: wp('65%'),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: 'orange',
    shadowOffset: { width: 2, height: 5 },
    borderRadius: 30,
    marginBottom: hp('2%'),
  },
});

export default Page;
