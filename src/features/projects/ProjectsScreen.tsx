import {useTranslation} from "react-i18next";
import ProjectCards from "./components/ProjectCards";
import React, {createContext, use, useState} from "react";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import useProjects from "@/hooks/useProjects";
import {EmptyPage} from "@/components/layout/EmptyPage";

const ProjectsContext = createContext<ReturnType<typeof useProjects> | null>(null);

export default function ProjectsScreen() {
    const {t} = useTranslation("projects");
    const [activeTab, setActiveTab] = useState<number>(0);
    const projects = useProjects();

    return (
        <EmptyPage>
            <ProjectsContext value={projects}>
                <Box>
                    <Box>
                        <Typography variant={"h3"} sx={{marginBottom: "50px"}}>
                            {t("title")}
                        </Typography>
                        <Typography variant={"body1"} sx={{wordWrap: "break-word", marginBottom: "50px"}}>
                            {t("description")}
                        </Typography>
                    </Box>

                    <Tabs value={activeTab} onChange={(event: React.SyntheticEvent, newValue: number) => {
                        setActiveTab(newValue);
                    }}>
                        <Tab label={t("tabs.active")} key={"active"}/>
                        <Tab label={t("tabs.archived")} key={"archived"}/>
                    </Tabs>

                    <ProjectCards showWithArchived={activeTab !== 0}/>
                </Box>
            </ProjectsContext>
        </EmptyPage>
    );
};


export const useProjectsContext = () => {
    const ctx = use(ProjectsContext);
    if (!ctx) throw new Error("useProjectsContext must be used within a project");
    return ctx;
}
