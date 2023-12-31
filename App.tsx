import { Platform, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import OneSignal from "react-native-onesignal";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserEmailCreate } from "./src/notifications/notificationsTags";

OneSignal.setAppId(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID || "");

const oneSignalAppId =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_ONE_SIGNAL_APP_ID
    : process.env.EXPO_PUBLIC_ANDROID_ONE_SIGNAL_APP_ID;
OneSignal.setAppId(oneSignalAppId ?? "");

OneSignal.setEmail("amanda@email.com");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate("amanda2@email.com");

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
