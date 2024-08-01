import React, {useState, useEffect} from "react";
import {Text, View, Button, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

export const CronometroScreen = () => {

  const [time, setTime] = useState({ m: 0, s: 0, ms: 0 });
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setTime({ m: 0, s: 0, ms: 0 });
    setIsActive(false);
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let minutes = prevTime.m,
            seconds = prevTime.s,
            milliseconds = prevTime.ms + 1;
          if (milliseconds === 100) {
            seconds++;
            milliseconds = 0;
          }
          if (seconds === 60) {
            minutes++;
            seconds = 0;
          }
          return { m: minutes, s: seconds, ms: milliseconds };
        });
      }, 1);
    } else if (!isActive && interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isActive, time]);

  return (
    <View style={style.container}>
      <View style={style.customView}>

        <View style={style.timerInfoContainer}>
          <Text style={style.infoTextStyle}>{`${time.m.toString().padStart(2, '0')}`}</Text>
          <Text style={style.infoTextStyle}>:</Text>
          <Text style={style.infoTextStyle}>{`${time.s.toString().padStart(2, '0')}`}</Text>
          <Text style={style.infoTextStyle}>:</Text>
          <Text style={style.infoTextStyle}>{`${time.ms.toString().padStart(2, '0')}`}</Text>
        </View>

        <View style={style.buttonsContainer}>
          <Icon
            reverse
            name={isActive ? "pause" : "play"}

            size={28}
            type="font-awesome"
            color="#65b601"
            onPress={toggle}
          />
          <Icon
            reverse
            size={28}
            name={"stop"}
            type="font-awesome"
            color="#de0303"
            onPress={reset}
          />
        </View>
      </View>
    </View>
  );
};

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
  timerInfoContainer: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 200,
    justifyContent: 'space-around',
  },
  infoTextStyle: {
    fontSize: 60,
    fontWeight: 'semibold'
  },
  buttonsContainer: {
    width: '60%',
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-around',
  }
})
