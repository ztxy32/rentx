import React from "react";
import { Calendar as CustomCalendar, LocaleConfig } from "react-native-calendars";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { ptBR } from "./localeConfig";
import { DateData } from "../../@types/dateData/dateDate";
import { generateInterval } from "./generateInterval";


LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDatesProps{
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
}

interface CalendarProps{
    markedDates: MarkedDatesProps;
    onDayPress: (date: DateData) => void;
}

interface DayProps{
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

function Calendar({markedDates, onDayPress}:CalendarProps){
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
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval
}