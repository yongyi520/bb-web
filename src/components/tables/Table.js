import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { getTableConstants, getTableFunctions, TABLE_TYPE } from "../../lib/tableUtils";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
};

export const Table = ({ type, data, addFunc, updateFunc, deleteFunc }) => {
  console.log("table data", data);
  const TABLE_CONSTANTS = getTableConstants(type);
  const [onAdd, onUpdate, onDelete] = getTableFunctions(
    type,
    addFunc,
    updateFunc,
    deleteFunc
  );
  // console.log('on add', onAdd)
  return (
    <MaterialTable
      icons={tableIcons}
      title={TABLE_CONSTANTS.TITLE}
      columns={TABLE_CONSTANTS.COLUMNS}
      data={data}
      actions={type === TABLE_TYPE.ALGO ? [
        {
          icon: (props, ref) => <ChevronRight {...props} ref={ref} />,
          tooltip: "Run Algo",
          onClick: (event, rowData) => {
            alert("running algo");
          }
        }
      ] : [null]}
      editable={{
        onRowAdd: onAdd,
        onRowUpdate: onUpdate,
        onRowDelete: onDelete
      }}
      options={{
        actionsColumnIndex: -1
      }}
    />
  );
};

Table.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string.isRequired,
  addFunc: PropTypes.func.isRequired,
  updateFunc: PropTypes.func.isRequired,
  deleteFunc: PropTypes.func.isRequired
};
