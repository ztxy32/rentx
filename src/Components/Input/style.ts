import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";

interface Props{
    isFocused: boolean;
}

export const Container = styled.View`
    margin-bottom: 9px;
    flex-direction: row;
`;
export const IconContainer = styled.View<Props>`
    width: 55px;
    height: 55px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background_secondary};
    margin-right: 2px;
    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-color: ${theme.colors.main};
        border-bottom-width: 2px;
        margin-right: 0px;
    `};
`;
export const InputDeTexto = styled.TextInput<Props>`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary};
    font-size: ${RFValue(15)}px;
    padding: 0px 23px;
    ${({ isFocused, theme }) => isFocused && css`
        border-bottom-color: ${theme.colors.main};
        border-bottom-width: 2px;
    `};
`;