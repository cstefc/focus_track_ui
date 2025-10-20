import "@/api/domain/general/AppUser"
import CrudRepository from "../api/crud-repository";
import {AppUser} from "../api/domain/general/AppUser";
import {Project} from "../api/domain/projects/Project";

const api = {
    "user": new CrudRepository<AppUser>("/api/user"),
    "project": new CrudRepository<Project>("/api/project"),
}

export default api