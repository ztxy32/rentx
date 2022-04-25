import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
    margin-top: ${getStatusBarHeight()}px;
`;
