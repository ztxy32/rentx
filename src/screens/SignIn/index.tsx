import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { PasswordInput } from "../../Components/PasswordInput";
import { Container, Header, Title, SubTitle, Form, Footer,  } from "./style";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { FirstStep } from "../SignUp/FirstStep";
import { useAuth } from "../../Hooks/auth";



export function SignIn(){
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório.")
                    .email("Digite um e-mail válido"),
                password: Yup.string()
                    .required("Senha obrigatória")
            });
            await schema .validate({email, password})
            Alert.alert("funfou")
            signIn({ email, password, })
        }catch(e){
            if (e instanceof Yup.ValidationError){
                Alert.alert("Opa", e.message);
            }else{
                Alert.alert("Error na autentificação ", "Ocorreu um error ao fazer login");
            }
        }
        
    }
    function handleCreatNewAccount(){
        navigation.navigate("FirstStep");
    }
    return(
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle="dark-content" 
                        backgroundColor="transparent" 
                        translucent 
                    />
                    <Header>
                        <Title>
                            Estamos{"\n"}quase lá.
                        </Title>
                        <SubTitle>
                            Faça teu login para começar{"\n"}uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName="mail" 
                            placeholder="E-mail" 
                            keyboardType="email-address" 
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}                            
                        />
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>
                    
                    <Footer>
                        <Button title="Login" onPress={handleSignIn}/>
                        <Button 
                            title="Criar conta gratuita" 
                            color={theme.colors.background_secondary} 
                            onPress={handleCreatNewAccount}
                            light
                        />
                        
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}