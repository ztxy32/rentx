import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetais";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";

export function StackRoutes(){
    const { Navigator, Screen } = createNativeStackNavigator();
    return(
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Home" >
            <Screen name="SignIn" component={ SignIn } />
            <Screen name="FirstStep" component={ FirstStep } />
            <Screen name="SecondStep" component={ SecondStep } />
            <Screen name="Home" component={ Home } options={{gestureEnabled: false}}/>
            <Screen name="CarDetails" component={ CarDetails } />
            <Screen name="Scheduling" component={ Scheduling } />
            <Screen name="SchedulingDetails" component={ SchedulingDetails } />
            <Screen name="Confirmation" component={ Confirmation } />
            <Screen name="MyCars" component={ MyCars } />
        </Navigator>
    );
}