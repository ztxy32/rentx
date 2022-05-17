import React from "react";
import { TouchableOpacityProps } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../utils/getAccessoriesIcon";
import { Container,Details,Brand,CarName,About,Rent,Period,Price,Type,CarImage, } from "./style";


interface Props extends TouchableOpacityProps{
    CarDataProps: CarDTO;
}

export function Cars({CarDataProps, ...rest} : Props){
    const MotorIcon = getAccessoriesIcon(CarDataProps.fuel_type);

    return(
        <Container {...rest} activeOpacity={.6}>
            <Details>
                <Brand>{CarDataProps.brand}</Brand>
                <CarName>{CarDataProps.name}</CarName>

                <About>
                    <Rent>
                        <Period>{CarDataProps.period}</Period>
                        <Price>{`R$ ${CarDataProps.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon/>
                    </Type>
                </About>
            </Details>

            <CarImage source={{uri: CarDataProps.thumbnail}} resizeMode="contain"/>
        </Container>
    );
}