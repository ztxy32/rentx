import "react-native-gesture-handler";
import React from 'react';
import { ThemeProvider } from "styled-components";
import { 
	useFonts, 
	Archivo_400Regular, 
	Archivo_500Medium, 
	Archivo_600SemiBold 
} from "@expo-google-fonts/archivo";
import { 
	Inter_400Regular, 
	Inter_500Medium 
} from "@expo-google-fonts/inter";
import AppLoading from 'expo-app-loading';
import theme from './src/style/theme';
import { Routes } from "./src/Routes";


export default function App() {
	const [fontLoaded] = useFonts({
    	Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold,
    	Inter_400Regular, Inter_500Medium
	});

	if(!fontLoaded){ return <AppLoading/> }
	
	return (
		<>
			<ThemeProvider theme={theme}>
				<Routes/>
			</ThemeProvider>
		</>
	);
}