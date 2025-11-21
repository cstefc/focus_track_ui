import React from "react";
import {useTranslation} from "react-i18next";

import {Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface HomeCardProps {
    card: string
}

export default function HomeCard({card}: HomeCardProps) {
    const {t} = useTranslation("home");

    return (
        <Card sx={{}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{t(`cards.${card}.title`)}</Typography>
                <Typography variant="body1" component="div">{t(`cards.${card}.text`)}</Typography>
            </CardContent>
        </Card>
    );
}