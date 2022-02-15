import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./style";

interface Props extends TouchableOpacityProps{
    title: string;
}

export function ConfirmButton({title, ...rest}: Props){
    return(
        <Container {...rest} activeOpacity={.7}> 
            <Title>{title}</Title>
        </Container>
    );
}