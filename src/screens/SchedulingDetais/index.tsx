import React from "react";
import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import EnergySvg from "../../assets/energy.svg";
import { Button } from "../../Components/Button";
import Feather from "@expo/vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Container, Header, CarImages, Content, Details, Description, Brand, CarName, Rent, Period, Price, Acessories, Footer, RentalPeriod, CalendarIcon, DateInfo, DateTitle, DateValue, RentalPrice, RentalPriceLabel, RentalPriceDetails, RentalPriceQuota, RentalPriceTotal} from "./style";
import { useNavigation } from "@react-navigation/native";


export function SchedulingDetails(){
    const theme = useTheme();
    const navigation = useNavigation();

    function handleCompletRental(){
        navigation.navigate("SchedulingCompleted")
    }
    return(
        <Container>
            <Header>
                <BackButton onPress={() => {}}/>
            </Header>
            <CarImages>
                <ImageSlider imageUrl={["https://www.pngmart.com/files/21/Red-Tesla-Car-PNG-Photos.png"]}/>
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Tesla</Brand>
                        <CarName>Model S</CarName>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Acessories>
                    <Acessory name="250km/h" icon={SpeedSvg}/>
                    <Acessory name="1.99s" icon={AccelerationSvg}/>
                    <Acessory name="1020" icon={ForceSvg}/>
                    <Acessory name="Eletrico" icon={EnergySvg}/>
                    <Acessory name="Auto" icon={ExchangeSvg}/>
                    <Acessory name="2 pessoas" icon={PeopleSvg}/>
                </Acessories>   

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(25)} color={theme.colors.shape}/>
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>09fev2022</DateValue>
                    </DateInfo>
                    <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text}/>
                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>09fev2022</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diárias </RentalPriceQuota>
                        <RentalPriceTotal>R$ 2900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>
            <Footer>
                <Button title="Alugar agora" color={theme.colors.success} onPress={ handleCompletRental }/>
            </Footer>

        </Container>
    );
}