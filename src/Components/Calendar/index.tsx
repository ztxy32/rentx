import React from "react";
import { Calendar as CustomCalendar, LocaleConfig } from "react-native-calendars";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";


LocaleConfig.locales["pt-br"] = {
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Septembro","Octubro", "Novembro", "Dezembro"],
    monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    //today: "hoje"
}
LocaleConfig.defaultLocale = "pt-br";

export function Calendar(){
    const tema = useTheme();
    return(
        <CustomCalendar 
            renderArrow={(direction) => 
                <Feather 
                    name={direction == "left" ? "chevron-left" : "chevron-right"} 
                    size={24} 
                    color={tema.colors.text}
                />
            }
            headerStyle={{
                backgroundColor: tema.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: tema.colors.text_detail,
                paddingBottom:10,
                marginBottom: 10,
            }}
            theme={{
                textDayFontFamily: tema.fonts.primary,
                textDayHeaderFontFamily: tema.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                textMonthFontFamily: tema.fonts.secundary_600,
                monthTextColor: tema.colors.title,
                arrowStyle: {
                    marginHorizontal: -15,
                }
            }}
            firstDay={1}
            minDate={String(new Date())}
        />
    );
}