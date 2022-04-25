import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetais";
import { SchedulingCompleted } from "../screens/SchedulingCompleted";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

export function StackRoutes(){
    const { Navigator, Screen } = createNativeStackNavigator();
    return(
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash" >
            <Screen name="Splash" component={Splash} />
            <Screen name="Home" component={Home} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="SchedulingCompleted" component={SchedulingCompleted} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}