import React from "react";
import { useTheme } from "styled-components";
import { Container, Title } from "./style";


interface Props{
    title: string;
    color?: string;
    onPress: () => void;
}


export function Button({title, color, onPress}:Props){
    const theme = useTheme();
    return(
        <Container color={color ? color : theme.colors.main} onPress={onPress} activeOpacity={.7}>
            <Title>{title}</Title>
        </Container>
    );
}