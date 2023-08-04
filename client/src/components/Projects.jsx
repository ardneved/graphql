import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectsQueries";

import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import { Table } from "react-bootstrap";

export default function Projects({ editProject }) {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const onEditProject = (project) => {
    editProject(project);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <h5 className="pt-1 px-1">Projects</h5>
          <Table className="table table-hover mt-3"  responsive="lg">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  triggerEditProject={onEditProject}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
