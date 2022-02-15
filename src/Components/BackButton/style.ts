import styled from "styled-components/native";
import { BorderlessButton} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const Container = styled(BorderlessButton)`
    margin-top: ${getStatusBarHeight()}px;
`;