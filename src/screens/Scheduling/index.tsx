import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../Components/BackButton";
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer} from "./style";
import ArrowLeftSvg from "../../assets/arrow.svg";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../Components/Button";
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from "../../Components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlataformDate";
import { CarDTO } from "../../dtos/CarDTO";


interface RentalPeriod {
    //start: number;
    startFormatted: string;
    //end: number;
    endFormatted: string;
}
interface Params {
    car: CarDTO;
}

export function Scheduling(){
    const navigation = useNavigation();
    const tema = useTheme();
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRent(){
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert("Seleccione o periodo do aluguel")
        }else{
            navigation.navigate("SchedulingDetails", {
                car,
                dates: Object.keys(markedDates)
            })
        }
        
    }


    function handleGoBack(){
        navigation.goBack();
    }

    
    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date

        if(start.timestamp > end.timestamp){
            start = end
            end = start
        }
        setLastSelectedDate(end)
        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0];
        const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];
        setRentalPeriod({
            //start: start.timestamp, 
            //end: end.timestamp,
            startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
            endFormatted: format(getPlatformDate(new Date(lastDate)), "dd/MM/yyyy"),
        })
        
    }

    return(
        <Container>
            <Header>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
                <BackButton color={tema.colors.shape} onPress={handleGoBack}/>
                <Title>Escolha uma{"\n"}data de início e{"\n"}fim do aluguel</Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <ArrowLeftSvg/>
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                    <ArrowLeftSvg/>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRent}/>
            </Footer>
        </Container>
    );
}