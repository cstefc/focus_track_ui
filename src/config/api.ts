import "@/api/domain/general/AppUser"
import CrudRepository from "../api/crud-repository";
import {AppUser} from "../api/domain/general/AppUser";
import {CreateProject, Project} from "../api/domain/projects/Project";

const api = {
    "user": new CrudRepository<AppUser, null, null>("/api/users"),
    "project": new CrudRepository<Project, CreateProject, null>("/api/projects"),
}

export default api