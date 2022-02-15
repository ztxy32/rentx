import React from "react";
import { Acessory } from "../../Components/Acessory";
import { BackButton } from "../../Components/BackButton";
import { ImageSlider } from "../../Components/ImageSlider";
import { Container, Header, CarImages, Content, Details, Description, Brand, CarName, Rent, Period, Price, About, Acessories, Footer} from "./style";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import EnergySvg from "../../assets/energy.svg";
import { Button } from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";

export function CarDetails(){
    const navigation = useNavigation();

    function handleConfirmRent(){
        navigation.navigate("Scheduling");
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
                <About>
                    Model S is built from the ground up as an electric vehicle,
                    with a high-strength architecture and floor-mounted battery 
                    pack for incredible occupant protection and low rollover risk. 
                    Every Model S includes Tesla's latest active safety features, 
                    such as Automatic Emergency Braking, at no extra cost.
                </About>
                
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRent} />
            </Footer>

        </Container>
    );
}