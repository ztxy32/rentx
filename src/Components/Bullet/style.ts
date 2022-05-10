import styled from "styled-components/native";

interface imageIndexProps{
    active?: boolean,
}

export const ImageIndex = styled.View<imageIndexProps>`
    width: 6px;
    height: 6px;
    background-color: ${({theme, active}) => active ? theme.colors.title : theme.colors.shape};
    margin-left: 8px;
    border-radius: 3px;
`;