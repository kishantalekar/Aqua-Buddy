import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import Welcome from "../screens/intro/Welcome/Welcome";
import Intro from "../screens/intro/Intro";
import { getItem } from "../storage/database";
import { AUTH_KEY } from "../constants/storage";
import * as SplashScreen from "expo-splash-screen";
import Setting from "../screens/settings/Setting";
import LogScreen from "../screens/Logs/LogScreen";
import ReminderScheduleScreen from "../screens/ReminderSchedule/ReminderScheduleScreen";
import { GENDER_SCREEN } from "../constants/screen";
import GenderScreen from "../screens/intro/Gender/GenderScreen";
import WeightScreen from "../screens/intro/Weight/WeightScreen";
import ActivityScreen from "../screens/intro/Activity/ActivityScreen";
import WaterIntakeScreen from "../screens/intro/WaterIntakeScreen";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const [isAuth, setIsAuth] = useState(false);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      const skipWelcomeScreen = (await getItem(AUTH_KEY)) || false;

      if (skipWelcomeScreen) {
        setIsAuth(skipWelcomeScreen);
      }
      setIsTryingLogin(false);
    }
    fetchAuth();
  }, []);

  if (!isTryingLogin) {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 400);
  }
  const handleAuthChange = (newAuthStatus) => {
    setIsAuth(newAuthStatus);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth && (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Intro"
              component={Intro}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <Setting {...props} handleAuthChange={handleAuthChange} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="log"
          options={{
            headerShown: false,
          }}
          component={LogScreen}
        />
        <Stack.Screen
          name="reminderSchedule"
          options={{
            headerShown: false,
          }}
          component={ReminderScheduleScreen}
        />
        <Stack.Screen
          name="genderScreen"
          options={{ headerShown: false }}
          component={GenderScreen}
        />
        <Stack.Screen
          name="weightScreen"
          options={{ headerShown: false }}
          component={WeightScreen}
        />
        <Stack.Screen
          name="activityScreen"
          options={{ headerShown: false }}
          component={ActivityScreen}
        />
        <Stack.Screen
          name="waterInTakeScreen"
          options={{ headerShown: false }}
          component={WaterIntakeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
