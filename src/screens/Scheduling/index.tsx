import React from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../Components/BackButton";
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer} from "./style";
import ArrowLeftSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import { Button } from "../../Components/Button";
import { Calendar } from "../../Components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling(){
    const navigation = useNavigation();
    const tema = useTheme();

    function handleConfirmRent(){
        navigation.navigate("SchedulingDetails")
    }

    return(
        <Container>
            <Header>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
                <BackButton color={tema.colors.shape} onPress={() => {}}/>
                <Title>Escolha uma{"\n"}data de início e{"\n"}fim do aluguel</Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={true}>9fev2022</DateValue>
                    </DateInfo>
                    <ArrowLeftSvg/>
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>9fev2022</DateValue>
                    </DateInfo>
                    <ArrowLeftSvg/>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRent}/>
            </Footer>
        </Container>
    );
}