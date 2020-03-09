import { gql } from "apollo-boost";

export const AlgoNoOrdersFragment = gql`
  fragment AlgoNoOrdersFragment on Algo {
    id
    exchange
    symbol
    name
    timeFrame
    timeFrameUnit
    additionalInfo
    status
    executedNum
    maxExecution
  }
`