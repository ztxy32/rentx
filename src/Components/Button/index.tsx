import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./style";



interface Props extends TouchableOpacityProps{
    title: string;
    color?: string;
    light?: boolean;
}


export function Button({title, color, onPress, light}:Props){
    const theme = useTheme();
    return(
        <Container 
            color={color ? color : theme.colors.main} 
            onPress={onPress} 
            activeOpacity={.7}
            
        >
            <Title light={light}>{title}</Title>
        </Container>
    );
}