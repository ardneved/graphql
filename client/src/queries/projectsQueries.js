import { gql } from "@apollo/client";


const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      clientId
    }
  }
`;

export { GET_PROJECTS };