import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { Container, Content, Title, Message, Footer} from "./style";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../Components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params{
    title: string;
    message: string;
    nextScreen: any;
}
interface Navigation {
    navigate: (value: string) => void;
}

export function Confirmation(){
    const {width} = useWindowDimensions();
    const navigation = useNavigation<Navigation>();
    const route = useRoute();
    const {title, message, nextScreen} = route.params as Params;

    function handleConfirm(){
        navigation.navigate(nextScreen);
    }
    return(
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />

                <Title>{title}</Title>
                <Message>
                    {message}
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>
        </Container>
    );
}