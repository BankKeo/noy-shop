import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import File from "../../file/File";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

function OfflineHistory() {
  const state = useContext(GlobalState);
  const [offlineHistory, setOfflineHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const gridRef = useRef();

  console.log(offlineHistory);

  const columnDefs = [
    { field: "createdAt", headerName: "Create", width: 150 },
    {
      field: "cart",
      valueGetter: (params) => {
        return params.data.cart[0].product_id;
      },
      headerName: "product_id",
    },
    {
      field: "cart",
      valueGetter: (params) => {
        return params.data.cart[0].title;
      },
      headerName: "Title",
    },
    {
      field: "cart",
      valueGetter: (params) => {
        return params.data.cart[0].price.toLocaleString("en") + " ກີບ";
      },
      headerName: "Price",
    },
    {
      field: "action",
      headerName: "Action",
      cellRendererFramework: (params) => (
        <Link to={"/offline_history/" + params.data.id}>
          <button className="userListEdit">View</button>
        </Link>
      ),
    },
  ];

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

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await axios.get("/api/paymentOffline", {
          headers: { Authorization: token },
        });
        setOfflineHistory(res.data);
      };
      getHistory();
    }
  }, [token, isAdmin, setOfflineHistory]);

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
              rowData={offlineHistory}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            ></AgGridReact>
          </div>
          {/* <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={offlineHistory}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OfflineHistory;
