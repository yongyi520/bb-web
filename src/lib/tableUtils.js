import _ from "lodash";

export const getTableFunctions = (tableType, onAdd, onUpdate, onDelete) => {
  switch(tableType) {
    case TABLE_TYPE.ALGO: 
      return [getAlgoOnAdd(onAdd), getAlgoOnUpdate(onUpdate), getOnDelete(onDelete)];
    case TABLE_TYPE.CHART_DATA_POINT:
      return [getChartDataPointOnAdd(onAdd), getChartDataPointOnUpdate(onUpdate), getOnDelete(onDelete)]
    default: 
    return null
  }
};

const getChartDataPointOnAdd = (addFunc) => {
  return newData => {
    newData.exchange = _.capitalize(newData.exchange);
    newData.symbol = _.toUpper(newData.symbol);
    newData.timeFrameUnit = _.toUpper(newData.timeFrameUnit);
    newData.timeFrame = parseInt(newData.timeFrame);
    newData.epochTime = parseInt(newData.epochTime);
    newData.typePeriod = parseInt(newData.typePeriod);
    newData.value = parseFloat(newData.value)
    console.log('new chart point to add', newData)
    return addFunc({ variables: { data: newData } });
  };
}

const getChartDataPointOnUpdate = (updateFunc) => {
  return (newData, oldData) => {
    newData.exchange = _.capitalize(newData.exchange);
    newData.symbol = _.toUpper(newData.symbol);
    newData.timeFrameUnit = _.toUpper(newData.timeFrameUnit);
    newData.timeFrame = parseInt(newData.timeFrame);
    newData.epochTime = parseInt(newData.epochTime);
    newData.typePeriod = parseInt(newData.typePeriod);
    newData.value = parseFloat(newData.value)
    const updateData = _.omit(newData, ["id", "__typename"]);
    return updateFunc({ variables: { id: newData.id, data: updateData } });
  }
}


const getAlgoOnAdd = (addFunc) => {
  return newData => {
    newData.exchange = _.capitalize(newData.exchange);
    newData.symbol = _.toUpper(newData.symbol);
    newData.timeFrameUnit = _.toUpper(newData.timeFrameUnit);
    newData.timeFrame = parseInt(newData.timeFrame);
    newData.executedNum = parseInt(newData.executedNum);
    newData.maxExecution = parseInt(newData.maxExecution);
    return addFunc({ variables: { data: newData } });
  };
};

const getAlgoOnUpdate = (updateFunc) => {
  return (newData, oldData) => {
    newData.exchange = _.capitalize(newData.exchange);
    newData.symbol = _.toUpper(newData.symbol);
    newData.timeFrameUnit = _.toUpper(newData.timeFrameUnit);
    newData.timeFrame = parseInt(newData.timeFrame);
    newData.executedNum = parseInt(newData.executedNum);
    newData.maxExecution = parseInt(newData.maxExecution);
    const updateData = _.omit(newData, ["id", "__typename"]);
    return updateFunc({ variables: { id: newData.id, data: updateData } });
  };
};

const getOnDelete = (deleteFunc) => {
  return oldData => {
    return deleteFunc({ variables: { id: oldData.id } });
  };
};

export const getTableConstants = tableType => {
  switch (tableType) {
    case TABLE_TYPE.ALGO:
      return ALGO_TABLE;
    case TABLE_TYPE.CHART_DATA_POINT:
      return CHART_DATA_POINT_TABLE;
    default:
      return null;
  }
};

export const TABLE_TYPE = {
  ALGO: "ALGO",
  CHART_DATA_POINT: "CHART_DATA_POINT"
};

const ALGO_TABLE = {
  TITLE: "Algos",
  COLUMNS: [
    { title: "Exchange", field: "exchange" },
    { title: "Symbol", field: "symbol" },
    { title: "Name", field: "name" },
    {
      title: "Time Frame",
      field: "timeFrame",
      type: "numeric"
    },
    { title: "Time Frame Unit", field: "timeFrameUnit" },
    { title: "Status", field: "status" },
    { title: "Executed Number", field: "executedNum", type: "numeric" },
    { title: "Max Execution", field: "maxExecution", type: "numeric" }
  ]
};

const CHART_DATA_POINT_TABLE = {
  TITLE: "Chart Data Points",
  COLUMNS: [
    { title: "Exchange", field: "exchange" },
    { title: "Symbol", field: "symbol" },
    {
      title: "Time Frame",
      field: "timeFrame",
      type: "numeric"
    },
    { title: "Time Frame Unit", field: "timeFrameUnit" },
    { title: "Epoch Time", field: "epochTime", type: "numeric" },
    { title: "Type", field: "type"},
    { title: "Type Period", field: "typePeriod", type: 'numeric' },
    { title: "Value", field: "value", type: "numeric" }
  ]
};
