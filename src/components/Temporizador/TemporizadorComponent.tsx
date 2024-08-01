import {StyleSheet, Text, View, Button} from "react-native";
import {Icon} from "react-native-elements";
import React, {useEffect, useRef, useState} from "react";
import RNPickerSelect from 'react-native-picker-select';

export const TemporizadorComponent = () => {

  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Llenar los pickers con opciones
  const pickerOptions = [];
  for (let i = 0; i < 60; i++) {
    pickerOptions.push({label: i.toString().padStart(2, '0'), value: i});
  }

  const clearOptions = () =>{
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  const stopCountdown = () => {
    if(intervalId){
      clearInterval(intervalId);
      setIntervalId(null);
      clearOptions();
      setIsActive(false);
    }
  }

  const pauseCountdown = () => {
    setIntervalId(null);
    setIsActive(false);
  }

  const startCountdown = () => {
    setIsActive(true);
    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    const interval: NodeJS.Timeout = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
      } else {
        setSeconds(totalSeconds % 60);
        setMinutes(Math.floor(totalSeconds / 60) % 60);
        setHours(Math.floor(totalSeconds / 3600));
        totalSeconds--;
      }
    }, 1000);

    setIntervalId(interval);
  };

  useEffect(() => {
    return () => {
      // Limpieza al desmontar
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <View style={style.container}>

      <View style={style.customView}>
        <View style={style.infoContainer}>
          <RNPickerSelect
            onValueChange={(value) => setHours(value)}
            placeholder={{ label: "00", value: 0 }}
            items={pickerOptions}
            useNativeAndroidPickerStyle={false}
            value={hours}
            style={pickerSelectStyles}
          />
          <Text style={style.infoTextStyle}>:</Text>
          <RNPickerSelect
            onValueChange={(value) => setMinutes(value)}
            placeholder={{color:'black', label: "00", value: 0 }}
            items={pickerOptions}
            value={minutes}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
          />
          <Text style={style.infoTextStyle}>:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSeconds(value)}
            placeholder={{ label: "00", value: 0 }}
            items={pickerOptions}
            value={seconds}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
          />
        </View>

        <View style={style.buttonsContainer}>
          {!isActive ? (
            <Icon
              reverse
              name={"play"}
              size={28}
              type="font-awesome"
              color="#65b601"
              onPress={startCountdown}
            />
          ) : (
            <>
              <Icon
                reverse
                name={"pause"}
                size={28}
                type="font-awesome"
                color="#65b601"
                onPress={pauseCountdown}
              />
              <Icon
                reverse
                size={28}
                name={"stop"}
                type="font-awesome"
                color="#de0303"
                onPress={stopCountdown}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    width: '100%',
  },
  customView: {
    width: '90%',
    height: '80%',
    alignItems:'center',
    marginHorizontal: 20,
  },
  buttonsContainer: {
    width: '60%',
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-around',
  },
  infoContainer: {
    width: '80%',
    height:150,
    flexDirection: 'row',
    marginTop: 200,
    justifyContent: 'space-around',
  },
  infoTextStyle: {
    fontSize: 55,
    color: 'gray',
    fontWeight: 'semibold'
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 60,
    fontWeight: "semibold",
    color: 'black'
  },
  placeHolder: {
    color:'black'
  }
});