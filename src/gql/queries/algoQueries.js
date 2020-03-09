import { gql } from "apollo-boost";
import { AlgoNoOrdersFragment } from '../fragments/algoFragments'
export const GET_ALGOS = gql`
  query {
    getAlgos{
      ...AlgoNoOrdersFragment
    }
  }
  ${AlgoNoOrdersFragment}
`