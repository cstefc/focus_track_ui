import {Avatar, Box, Button, Stack, Typography} from "@mui/material";
import HomeCard from "@/features/home/components/HomeCard";
import {getAuth, signInWithPopup} from "firebase/auth";
import {useTranslation} from "react-i18next";
import React from "react";
import {Providers} from "@/config/firebase";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const {t} = useTranslation("home");
    const cards: string[] = ["success", "productivity", "tracking"]
    const currentUser = getAuth().currentUser;
    const navigate = useNavigate();

    async function onLogin (){
        if (!currentUser){
            await signInWithPopup(getAuth(), Providers.google)
            navigate("/");
        }else{
            navigate("/projects");
        }
    }

    return (
        <Stack minHeight={"90vh"}
               direction={"column"}
               spacing={1}
               display={"flex"}
               justifyContent={"space-between"}
               alignItems={"center"}

        >
            {/* Hero section */}
            <Box
                sx={{
                    height: "33vh",
                    width: "100%",
                    backgroundImage: `url("/productivity3.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
            >
                <Typography variant="h3" fontWeight={700} sx={{whiteSpace: "pre-line", margin: "50px"}}>
                    {t("title")}
                </Typography>
            </Box>

            {/* Content section */}

            <Box sx={{margin: "16px", textAlign: "center"}}>
                <Typography
                    variant="h5"
                    sx={{margin: 4}}
                >
                    {currentUser ? t("CTA-loggedIn") : t("CTA-loggedOut")}
                </Typography>

                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={onLogin}
                >
                    {!currentUser ? <Avatar
                        src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"}
                        alt={"Google Logo"}
                        sx={{marginRight: 2}}
                    /> : null}

                    {currentUser ? t("button.loggedIn") : t("button.loggedOut")}
                </Button>
            </Box>

            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                {cards.map((card, index) => <HomeCard key={index} card={card}/>)}
            </Box>

        </Stack>
    );
}
