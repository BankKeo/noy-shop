import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import File from "../../file/File";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const gridRef = useRef();

  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "paymentID", headerName: "Payment ID" },
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
    { field: "createdAt", headerName: "Create", width: 150 },
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
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/historys", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

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
          <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={history}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
