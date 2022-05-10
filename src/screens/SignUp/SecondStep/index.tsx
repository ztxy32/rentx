import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackButton } from "../../../Components/BackButton";
import { Bullet } from "../../../Components/Bullet";
import { Button } from "../../../Components/Button";
import { PasswordInput } from "../../../Components/PasswordInput";
import api from "../../../services/api";
import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from "./style";

interface Params{
    user: {
        name: string,
        email: string,
        driveLicense: string,
    }
}

export function SecondStep(){
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params as Params;
    console.log(user)

    function handleGoBack(){
        navigation.goBack();
    }
    async function handleRegister(){
        if(!password || !passwordConfirm){
            return Alert.alert("Preencha os campos de senha")
        }else if(password != passwordConfirm){
            return Alert.alert("As senhas não coincidem")
        }

        await api.post("/users",{
            name: user.name,
            email: user.email,
            driver_license: user.driveLicense,
            password
        }).then(() => {
            navigation.navigate("Confirmation", {
                title: "Conta criada!",
                message: `Agora é só fazer login\ne aproveitar`,
                nextScreen: "SignIn",
            });
        }).catch(() => {
            Alert.alert("Opa!", "não foi possível fazer o cadastro.")
        })
    }
    return(
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack}/>
                        <Steps>
                            <Bullet/>
                            <Bullet active/>
                        </Steps>
                    </Header>
                    <Title>Crie sua conta{"\n"}conta</Title>
                    <SubTitle>Faça seu cadastro de{"\n"} forma fácil e rápido</SubTitle>
                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput iconName="lock" placeholder="Senha" onChangeText={setPassword} value={password}/>
                        <PasswordInput iconName="lock"placeholder="Repetir senha" onChangeText={setPasswordConfirm} value={passwordConfirm}/>
                    </Form>
                    <Button title="Castrar" color={theme.colors.success} onPress={handleRegister}/>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}