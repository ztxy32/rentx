import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons/";
import { Container, InputDeTexto, IconContainer } from "./style";
import { TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native";

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>["name"],
    value?: string,
}

export function PasswordInput({iconName,value, ...rest} : InputProps){
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();

    function handlePasswordVisibility(){
        setPasswordVisibility(prevState => !prevState)
    }
    function handleInputFocus(){
        setIsFocused(true)
    }
    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return(
        <Container>
            <IconContainer isFocused={isFocused}>
            <Feather 
                    name={iconName} 
                    size={24} 
                    color={
                        isFocused || isFilled ? theme.colors.main :theme.colors.text_detail
                    } 
                />
            </IconContainer>

            <InputDeTexto 
                secureTextEntry={passwordVisibility}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                autoCapitalize="none"
                {...rest}
            />
            
            <TouchableOpacity onPress={handlePasswordVisibility} activeOpacity={.7}>
                <IconContainer isFocused={isFocused}>
                    <Feather 
                        name={passwordVisibility ? "eye" : "eye-off"} 
                        size={24} color={theme.colors.text_detail} 
                    />
                </IconContainer>
            </TouchableOpacity>
        </Container>
    );
}