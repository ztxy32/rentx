import React from "react";
import { SvgProps } from "react-native-svg";
import { Container, Name } from "./style";

interface Props{
    name: string;
    icon: React.FC<SvgProps>
}

export function Acessory({name, icon: Icon /*alias */}:Props){
    return(
        <Container>
            <Icon width={32} height={32}/>
            <Name>{name}</Name>
        </Container>
    );
}