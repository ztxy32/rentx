import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { FlatListProps } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";


export const Container = styled.View`
    flex: 1;
    background-color: ${ ({theme}) => theme.colors.background };
`;
export const Header = styled.View`
    width: 100%;
    height: 113px;
    background-color: ${({theme}) => theme.colors.header};   
    justify-content: flex-end;
    padding: 32px 24px; 
`;
export const HeaderContent = styled.View`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;
export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary};
`;
export const CarsList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
    contentContainerStyle: {padding: 24},
    showVerticalScrollIndicator: false,
})``;
