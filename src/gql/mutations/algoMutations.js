import { gql } from "apollo-boost";
import { AlgoNoOrdersFragment } from "../fragments/algoFragments";

export const ADD_ALGO = gql`
  mutation($data: AlgoInput!) {
    addAlgo(data: $data) {
      ...AlgoNoOrdersFragment
    }
  }
  ${AlgoNoOrdersFragment}
`; 
export const UPDATE_ALGO = gql`
  mutation($id: String!, $data: AlgoInput!) {
    updateAlgo(id: $id, data: $data) {
      ...AlgoNoOrdersFragment
    }
  }
  ${AlgoNoOrdersFragment}
`;

export const DELETE_ALGO = gql`
  mutation($id: String!) {
    deleteAlgo(id: $id){
      id
    }
  }
`;
