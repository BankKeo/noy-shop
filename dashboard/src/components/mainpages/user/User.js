import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import File from "../../file/File";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

const User = () => {
  const [users, setUsers] = useState([]);
  const gridRef = useRef();

  const getUsers = async () => {
    const res = await axios.get("/user");
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [columnDefs] = useState([
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
    },
    { field: "name", headerName: "Name", filter: true },
    { field: "email", headerName: "Email", filter: true },
    { field: "createdAt", headerName: "Create" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div className="container">
      <File />
      <div className="wrapper">
        <div className="history-page">
          <div>
            <button
              onClick={onBtExport}
              style={{ marginBottom: "5px", fontWeight: "bold" }}
            >
              Export to Excel
            </button>
          </div>
          <div className="ag-theme-alpine" style={{ height: 500, width: 802 }}>
            <AgGridReact
              ref={gridRef}
              rowData={users}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
