import { useNavigation } from "@react-navigation/native";
import { StatusBar, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../Components/BackButton";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { Container, Header, Title, Subtitle, Content, Appointmensts, AppointmentTitle, 
    QuantityOfAppointments, CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate, } from "./style";
import { Cars } from "../../Components/Cars";
import { AntDesign } from "@expo/vector-icons";
import { Load } from "../../Components/Load";

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const theme = useTheme();

    function handleGoBack(){
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars(){
            try{
                const response = await api.get("schedules_byuser?user_id=1");
                setCars(response.data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false);
            }
        }

        fetchCars()
    }, [])
    return(
        <Container>
            <Header>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
                <BackButton color={theme.colors.shape} onPress={handleGoBack}/>
                <Title>Escolha uma{"\n"}data de início e{"\n"}fim do aluguel</Title>
                <Subtitle>Conforto, segurança e practicidade.</Subtitle>
            </Header>
            {
                loading ? <Load/> :
                <Content>
                <Appointmensts>
                    <AppointmentTitle>
                        Agendamentos feitos
                    </AppointmentTitle>
                    <QuantityOfAppointments>{cars.length}</QuantityOfAppointments>
                </Appointmensts>
                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <CarWrapper>
                            <Cars CarDataProps={item.car}/>
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.startDate}</CarFooterDate>
                                    <AntDesign 
                                        name="arrowright" 
                                        size={20}
                                        color={theme.colors.title}
                                        style={{marginHorizontal: 10}}
                                    />
                                <CarFooterDate>{item.endDate}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                        
                    )}
                />
            </Content>
            }
            
        </Container>
    );
}