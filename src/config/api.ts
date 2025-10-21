import "@/api/domain/general/AppUser"
import CrudRepository from "../api/crud-repository";
import {AppUser} from "../api/domain/general/AppUser";
import {CreateProject, Project, UpdateProject} from "../api/domain/projects/Project";

const api = {
    "user": new CrudRepository<AppUser, null, null>("/api/users"),
    "project": new CrudRepository<Project, CreateProject, UpdateProject>("/api/projects"),
}

export default api