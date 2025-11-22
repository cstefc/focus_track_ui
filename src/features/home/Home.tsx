import React from "react";
import {Stack} from "@mui/material";

import PictureCarousel from "@/components/ui/PictureCarousel";
import HomeCard from "./components/HomeCard";

export default function Home() {
    const pictures: string[] = ["/productivity1.jpg", "/productivity2.jpg", "/productivity3.jpg", "/productivity4.jpg", "/productivity5.jpg"];
    const cards: string[] = ["success", "productivity", "tracking"]

    return (
        <Stack direction="column" spacing={2} sx={{
            alignItems: "center",
            minHeight: "90vh",
            justifyContent: "space-around",
        }}>
            <PictureCarousel pictures={pictures}/>

            <Stack direction="row" spacing={2}>
                {cards.map((card: string) => (
                    <HomeCard key={card} card={card}/>
                ))}
            </Stack>
        </Stack>
    )
}