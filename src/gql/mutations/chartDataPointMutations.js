import { gql } from "apollo-boost";
import { ChartDataPointFragment } from "../fragments/chartDataPointFragments";
export const ADD_CHART_DATA_POINT = gql`
  mutation($data: ChartDataPointInput!) {
    addChartDataPoint(data: $data) {
      ...ChartDataPointFragment
    }
  }
  ${ChartDataPointFragment}
`
export const UPDATE_CHART_DATA_POINT = gql`
  mutation($id: String!, $data: ChartDataPointInput!) {
    updateChartDataPoint(id: $id, data: $data) {
      ...ChartDataPointFragment
    }
  }
  ${ChartDataPointFragment}
`

export const DELETE_CHART_DATA_POINT = gql`
 mutation($id: String!) {
    deleteChartDataPoint(id: $id){
      id
    }
  } 
`