import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 109px;
    height: 92px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};
    padding: 16px;
    margin-bottom: 8px;
    border-radius: 5px;
`;
export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary};
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(13)}px;
`;