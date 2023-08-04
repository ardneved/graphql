import React, { createRef } from "react";
import Projects from "../components/Projects";
import { AddProjectModal } from "../components/AddProject";

export default function ProjectsPage() {

  const modalRef = createRef()
  const onEditProject=(project)=>{
    modalRef.current.toggleModal(project);
  }

  return (
    <>
      <div className="gap-3 mb-4">
        <AddProjectModal ref={modalRef}/>
      </div>
      <Projects editProject={onEditProject} />
    </>
  );
}
