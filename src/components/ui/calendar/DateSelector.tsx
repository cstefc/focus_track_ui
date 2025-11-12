import {Button, Stack} from "react-bootstrap";
import React from "react";
import {nextMonth, prevMonth} from "@/utils/calendar";
import {useTranslation} from "react-i18next";

export interface DateSelectorProps {
    date: Date;
    setDate: (newDate: Date) => void;
}

export default function DateSelector({date, setDate}: DateSelectorProps) {
    const {t} = useTranslation("general");
    const months = [t("calendar.months.january"), t("calendar.months.february"), t("calendar.months.march"), t("calendar.months.april"), t("calendar.months.may"), t("calendar.months.june"), t("calendar.months.july"), t("calendar.months.august"), t("calendar.months.september"), t("calendar.months.october"), t("calendar.months.november"), t("calendar.months.december")];

    return (
        <Stack direction={"horizontal"} className={"justify-content-between p-2"}>
            <Button
                className={"selector-button"}
                variant="dark"
                onClick={() => setDate(prevMonth(date))}
            >{t("calendar.date_selector.prev_month")}</Button>

            <p className={"month-text text p-2"}>{months[date.getMonth()] + " " + date.getFullYear()}</p>

            <Button
                className={"selector-button"}
                variant={'dark'}
                onClick={() => setDate(nextMonth(date))}
            >{t("calendar.date_selector.next_month")}</Button>
        </Stack>

    );
}