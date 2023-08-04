
import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
mutation addProject($name: String!, $status: ProjectStatus!, $description: String!, $clientId: ID!){
    addProject(name: $name, description:$description, status:$status, clientId:$clientId){
        id
        name
        status
        description
        clientId
    }
}
`;

const UPDATE_PROJECT = gql`
mutation updateProject($name: String!, $status: ProjectStatusUpdate!, $description: String!, $clientId:ID!, $id: ID!){
    updateProject(name: $name, status:$status, description:$description, clientId:$clientId, id:$id){
        id
        name
        status
        description
        clientId
    }
}
`;

const DELETE_PROJECT = gql`
mutation deleteProject($id: ID!) {
    deleteProject(id: $id){
        id
        name
        description
        status
        clientId
    }
}
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
