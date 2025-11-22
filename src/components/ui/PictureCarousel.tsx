import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

interface PictureSlideshowProps {
    pictures: string[];
    interval?: number; // ms per picture
}

const PictureSlideshow: React.FC<PictureSlideshowProps> = ({
                                                               pictures,
                                                               interval = 5000, // default 5 seconds
                                                           }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pictures.length);
        }, interval);
        return () => clearInterval(timer);
    }, [pictures.length, interval]);

    if (!pictures.length) return null;

    return (
        <Box
            component="img"
            src={pictures[currentIndex]}
            alt={`slideshow-${currentIndex}`}
            sx={{
                width: { xs: "80%", sm: "60%", md: "40%" },
                height: "auto",
                borderRadius: 2,
                objectFit: "cover",
                mx: "auto",
                transition: "opacity 0.5s ease-in-out",
            }}
        />
    );
};

export default PictureSlideshow;
