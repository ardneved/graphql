
import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
mutation addProject($name: String!, $status: String!, $description: String!, $clientId: String!){
    addProject(name: $name, description:$description, status:$status, clientId:$clientId){
        id
        name
        status
        description
        clientID
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

export { ADD_PROJECT, DELETE_PROJECT };
