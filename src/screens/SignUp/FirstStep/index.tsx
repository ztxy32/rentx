import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BackButton } from "../../../Components/BackButton";
import { Bullet } from "../../../Components/Bullet";
import { Button } from "../../../Components/Button";
import { Input } from "../../../Components/Input";
import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from "./style";
import * as Yup from "yup";

export function FirstStep(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [driveLicense,setDriveLicense] = useState("");

    const navigation = useNavigation();
    function handleGoBack(){
        navigation.goBack();
    }
    async function handleNextStep(){
        try{
            const schema = Yup.object().shape({
                name: Yup.string()
                .required("A propriedade nome é obrigatória"),
                email: Yup.string()
                .email("e-mail inválido")
                .required("A propriedade e-mail é obrigatório"),
                driveLicense: Yup.string("CNH obrigatória")
            })
            const data = {name, email, driveLicense}
            await schema.validate(data)
            navigation.navigate("SecondStep", {user: data})
        }catch(e){
            if (e instanceof Yup.ValidationError){
                Alert.alert("Opa!", e.message)
            }
        }
        
    }
    return(
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack}/>
                        <Steps>
                            <Bullet active/>
                            <Bullet/>
                        </Steps>
                    </Header>
                    <Title>Crie sua conta{"\n"}conta</Title>
                    <SubTitle>Faça seu cadastro de{"\n"} forma fácil e rápido</SubTitle>
                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input 
                            iconName="user" 
                            placeholder="Nome" 
                            onChangeText={setName}
                            value={name}
                        />
                        <Input 
                            iconName="mail" 
                            placeholder="E-mail" 
                            keyboardType="email-address" 
                            autoCapitalize="none" 
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input 
                            iconName="credit-card" 
                            placeholder="CNH" 
                            keyboardType="numeric" 
                            onChangeText={(setDriveLicense)}
                            value={driveLicense}
                        />
                    </Form>
                    <Button title="Próximo" onPress={handleNextStep}/>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}