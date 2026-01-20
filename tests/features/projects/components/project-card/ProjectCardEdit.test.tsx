import {render, screen} from "@testing-library/react";
import {ProjectCardEdit} from "@/features/projects/components/project-card/ProjectCardEdit";
import {Project} from "@/api/domain/projects/Project";
import {useProjectsContext} from "@/features/projects/ProjectsScreen";

vi.mock("@/features/projects/ProjectScreen", () => ({
    useProjectsContext: vi.fn(),
}));

const mockedUseProjects = vi.mocked(useProjectsContext);

describe("project card edit", () => {
    it("should render correctly", async () => {
        // GIVEN
        const project: Project = {
            id: 1,
            title: "test project",
            description: "test description",
            archived: false,
        }
        const edit = vi.fn()

        // WHEN
        render(<ProjectCardEdit project={project} onEdit={edit}/>)

        // THEN
        expect(screen.queryByText("test project")).toBeInTheDocument();
        expect(screen.queryByText("test description")).toBeInTheDocument();
    })


    it("should load initial state", () => {
        // GIVEN

        // WHEN

        // THEN

    })

    it("should call onEdit when action is clicked", async () => {
        // GIVEN

        // WHEN

        // THEN

    })
})