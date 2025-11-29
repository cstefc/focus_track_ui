import {useEffect, useState} from "react";
import {CreateProject, Project, UpdateProject} from "@/api/domain/projects/Project";
import {useGetApi} from "@/hooks/useGetApi";
import {deleteApi, sendApi} from "@/api/apiCall";

export default function useProjects() {

    const [data, setData] = useState<Project[]>([]);
    const {data: fetched, loading} = useGetApi<Project[]>("/projects");

    useEffect(() => {
        if (fetched) {
            setData(fetched);
        }
    }, [fetched]);

    async function createProject(projectData: CreateProject) {
        const project = await sendApi<Project>("/projects", "POST", projectData);
        if (project) {
            setData(data => [...data, project]);
        }
    }

    async function updateProject(updateData: UpdateProject) {
        const result = await sendApi<Project>(`/projects`, "PUT", updateData);
        if (result) {
            setData(data => data.map((project) => project.id == updateData.id ? result : project));
        }
    }

    async function archiveProject(updateData: UpdateProject) {
        updateData.archived = true;
        const result = await sendApi<Project>(`/projects`, "PUT", updateData);
        if (result) {
            setData(data => data.map((project) => project.id == updateData.id ? result : project));
        }
    }

    function deleteProject(id: number) {
        void deleteApi(`/projects/?id=${id}`);
        setData(data.filter((p) => p.id !== id));
    }

    return {loading, data, createProject, updateProject, archiveProject, deleteProject};
}