import React, { useEffect, useState } from "react";
import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import { Button } from "../../Components/Button";
import Feather from "@expo/vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Container, Header, CarImages, Content, Details, Description, Brand, CarName, Rent, Period, Price, Acessories, Footer, RentalPeriod, CalendarIcon, DateInfo, DateTitle, DateValue, RentalPrice, RentalPriceLabel, RentalPriceDetails, RentalPriceQuota, RentalPriceTotal} from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../utils/getAccessoriesIcon";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlataformDate";
import api from "../../services/api";
import { Alert } from "react-native";

interface Params{
    car: CarDTO;
    dates: string[];
}
interface RentalPeriod{
    start: string;
    end: string;
}

export function SchedulingDetails(){
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;
    const rentTotal = Number(dates.length * car.rent.price)

    async function handleCompletRental(){
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];
        api.post("/schedules_byuser/",{
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1 ])), "dd/MM/yyyy"),
        })
        api.put(`/schedules_bycars/${car.id}`,{
            id: car.id,
            unavailable_dates
        })
        .then(() => navigation.navigate("SchedulingCompleted"))
        .catch(() => Alert.alert("Não foi possível confirmar o agendamento"))
    }
    function handleGoBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
            end: format(getPlatformDate(new Date(dates[dates.length - 1 ])), "dd/MM/yyyy"),
        })
    }, [])

    return(
        <Container>
            <Header>
                <BackButton onPress={handleGoBack}/>
            </Header>
            <CarImages>
                <ImageSlider imageUrl={car.photos}/>
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <CarName>{car.name}</CarName>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Acessories>
                    {
                        car.accessories.map(accessory => (
                            <Acessory 
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoriesIcon(accessory.type)}/>
                        ))
                    }  
                </Acessories>   

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(25)} color={theme.colors.shape}/>
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text}/>
                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`} </RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>
            <Footer>
                <Button title="Alugar agora" color={theme.colors.success} onPress={ handleCompletRental }/>
            </Footer>

        </Container>
    );
}