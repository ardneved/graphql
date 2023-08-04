import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "./mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectsQueries";
import { useConfirmationModalContext } from "./ConfirmationContextModal";
import { Button } from "react-bootstrap";

export default function ProjectCard({ project, triggerEditProject }) {
  const modalContext = useConfirmationModalContext();

  const onDelete = async (event) => {
    const result = await modalContext.showConfirmation(
      "Delete Project Confirmation!",
      `This process can not be undone. Are you sure you want to delete: ${project.name} ?`
    );
    result && deleteProject();
  };

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    // use refetch to make actual refresh call uncomment below or else for optimized behavior use updatecache
    // refetchQueries: [{query: GET_PROJECTS}]
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.status}</td>
      <td>{project.description}</td>
      <td>
        <Button variant="danger" size="sm" onClick={onDelete}>
          <FaTrash />
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => triggerEditProject(project)}
        >
          <FaEdit />
        </Button>
      </td>
    </tr>
  );
}
