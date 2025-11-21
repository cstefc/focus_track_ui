import {Box, Typography} from "@mui/material";
import React, {useState} from "react";
import DayView from "@/components/ui/day-view/DayView";
import Calendar from "@/components/ui/calendar/Calendar";

export default function PlanningScreen() {
    const [date, setDate] = useState(new Date());

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row"
        }}>
            {/* Left Column */}
            <Typography variant="h5" sx={{m: 4}}>
                TODO: Add overview month stats
            </Typography>


            {/* Center Calendar Column */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <DayView date={date}/>
                <Calendar date={date} setDate={setDate}/>
            </Box>

            {/* Right Column */}
            <Typography variant="h5" sx={{m: 4}}>
                TODO: Add overview day stats
            </Typography>
        </Box>
    );
}
