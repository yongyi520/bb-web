import { gql } from "apollo-boost";

export const ChartDataPointFragment = gql`
  fragment ChartDataPointFragment on ChartDataPoint {
    id
    exchange
    symbol
    timeFrame
    timeFrameUnit
    epochTime
    type
    typePeriod
    value
  }
`;
