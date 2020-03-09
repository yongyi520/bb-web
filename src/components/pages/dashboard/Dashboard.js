import React from "react";
// import PropTypes from 'prop-types'
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALGOS } from "../../../gql/queries/algoQueries";
import { GET_CHART_DATA_POINTS } from "../../../gql/queries/chartDataPointQueries";
import { Table } from "../../tables/Table";
import { TABLE_TYPE } from "../../../lib/tableUtils";
import {
  ADD_ALGO,
  UPDATE_ALGO,
  DELETE_ALGO
} from "../../../gql/mutations/algoMutations";
import {
  ADD_CHART_DATA_POINT,
  UPDATE_CHART_DATA_POINT,
  DELETE_CHART_DATA_POINT
} from "../../../gql/mutations/chartDataPointMutations";

const Dashboard = () => {
  const getAlgos = useQuery(GET_ALGOS);
  const getChartDataPoints = useQuery(GET_CHART_DATA_POINTS);
  const [addAlgo] = useMutation(ADD_ALGO, {
    update(cache, { data: { addAlgo } }) {
      const { getAlgos } = cache.readQuery({ query: GET_ALGOS });
      cache.writeQuery({
        query: GET_ALGOS,
        data: {
          getAlgos: getAlgos.concat(addAlgo)
        }
      });
    }
  });
  const [updateAlgo] = useMutation(UPDATE_ALGO);
  const [deleteAlgo] = useMutation(DELETE_ALGO, {
    update(cache, { data: { deleteAlgo } }) {
      const { getAlgos } = cache.readQuery({ query: GET_ALGOS });
      cache.writeQuery({
        query: GET_ALGOS,
        data: {
          getAlgos: _.filter(getAlgos, s => s.id !== deleteAlgo.id)
        }
      });
    }
  });
  const [addChartDataPoint] = useMutation(ADD_CHART_DATA_POINT, {
    update(cache, { data: { addChartDataPoint } }) {
      const { getChartDataPoints } = cache.readQuery({
        query: GET_CHART_DATA_POINTS
      });
      cache.writeQuery({
        query: GET_CHART_DATA_POINTS,
        data: {
          getChartDataPoints: getChartDataPoints.concat(addChartDataPoint)
        }
      });
    }
  });
  const [updateChartDataPoint] = useMutation(UPDATE_CHART_DATA_POINT);
  const [deleteChartDataPoint] = useMutation(DELETE_CHART_DATA_POINT, {
    update(cache, { data: { deleteChartDataPoint } }) {
      const { getChartDataPoints } = cache.readQuery({
        query: GET_CHART_DATA_POINTS
      });
      cache.writeQuery({
        query: GET_CHART_DATA_POINTS,
        data: {
          getChartDataPoints: _.filter(
            getChartDataPoints,
            s => s.id !== deleteChartDataPoint.id
          )
        }
      });
    }
  });

  if (getAlgos.loading || getChartDataPoints.loading) {
    return <div>Loading...</div>;
  }
  const algosData = getAlgos.data.getAlgos;
  const chartPointData = getChartDataPoints.data.getChartDataPoints;
  console.log("algos data", algosData);

  return (
    <div>
      <Table
        type={TABLE_TYPE.ALGO}
        data={algosData}
        addFunc={addAlgo}
        updateFunc={updateAlgo}
        deleteFunc={deleteAlgo}
      />
      <Table
        type={TABLE_TYPE.CHART_DATA_POINT}
        data={chartPointData}
        addFunc={addChartDataPoint}
        updateFunc={updateChartDataPoint}
        deleteFunc={deleteChartDataPoint}
      />
    </div>
  );
};

// Dashboard.propTypes = {

// }

// export default compose(
//   graphql(GET_ALGOS),
//   graphql(GET_CHART_DATA_POINTS)
// )(Dashboard)
export default Dashboard;
