import { gql } from "apollo-boost";
import { ChartDataPointFragment } from "../fragments/chartDataPointFragments";

export const GET_CHART_DATA_POINTS = gql`
  query {
    getChartDataPoints {
      ...ChartDataPointFragment
    }
  }
  ${ChartDataPointFragment}
`;
