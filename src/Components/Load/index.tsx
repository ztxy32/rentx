import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

export function Load(){
    const tema = useTheme();
    return(
        <ActivityIndicator
            color={tema.colors.main}
            size="large"
            style={{flex: 1}}
        />
    );
}