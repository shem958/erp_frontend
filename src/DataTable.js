//The code defines a functional component called 'DataTable' that displays a table of data with search and filter functionality
// The component imports React and some hooks {'useState' and 'useEffect'} from the React library. It also imports a CSS file for styling the table
import React, { useState, useEffect } from "react";
import "./DataTable.css";
import dataSet from "./data.json";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaGooglePay,
} from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// Hooks allow function components to have access to state and other React features
//props
const DataTable = (props) => {
  console.log("OPROS: ", props);
  /*
    The component defines three pieces of state using the 'useState' hook :
    > 'data'  is an array that will hold the data to be displayed in the table .It is initialized into an empty array.
    > 'searchTerm' is a string that will hold the current search term.It is initialized to an empty string 
    > 'statusFilter' is a string that will hold the current status filter.It is initialized into an empty string

    */
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newData, setNewData] = useState({});
  /*
   The component uses the 'useEffect' hook to fetch data from a JSON file called 'data.json' when the component mounts.The fetched data is then stored
   in the 'data' state using the 'setData' function.
   */
  useEffect(() => {
    setData(dataSet);
  }, []);

  console.log("DATA: ", data);
  /*
   The component defines two event handlers:
   > 'handleSearch' is called when the user types in the search input.It updates the 'searchTerm' state with the current value of the input
   > 'handlefilter' is called when the user clicks the 'Filter by status' button or selects a status from the dropdown .It updates the 'statusFilter' 
   state with the current value of the button or dropdown 
    */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilter = (event) => {
    setStatusFilter(event.target.value);
  };
  const handleAddData = (event) => {
    event.preventDefault();
    const newDataItem = { ...newData };
    setData([...data, newDataItem]);
    setNewData({}); // reset new data state
  };
  /*
   The component defines a 'filteredData' array that contains the data from the 'data' state but filtered based on 'searchTerm' and 'statusFilter'. 
   The filtering logic is as follows:
   > if 'searchTerm' is not empty, the function checks if the 'TransactionID', 'CustonerFullName' , or 'Amount' property of each item in the 'data' array
   includes the 'searchTerm'.
   > if 'statusFilter' is not empty , the function checks if the 'Status' property of each item in the 'data' array matches the 'statusFilter'.If it does , the 
   item is included in the 'filteredData' array.
   > if both 'searchTerm' and 'statusFilter' are empty , all items in the 'data' array are included in the 'filteredData' array.  
   */
  const filteredData = data.filter((item) => {
    const matchesSearchTerm =
      !searchTerm ||
      item.TransactionID.includes(searchTerm) ||
      item.CustomerFullName.includes(searchTerm) ||
      item.Amount.toString().includes(searchTerm);

    const matchesStatusFilter = !statusFilter || item.Status === statusFilter;

    return matchesSearchTerm && matchesStatusFilter;
  });

  console.log("searchTerm:", searchTerm);
  console.log("statusFilter:", statusFilter);
  console.log("filteredData:", filteredData);

  /*
The component renders a table with a search input , a "Filter by status" button , a dropdown for selecting a status filter , and a table body that contains the 
'filteredData' array . The 'filteredData' array is mapped to a table row for each item.
*/

  //The 'return' keyword in the 'DataTable.js' file is used to render the UI of the 'DataTable' component
  return (
    <div>
      <h2>Transactions</h2>
      <div className="search-container">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          style={{ flex: 1 }}
        />
        <FaSearch className="search-icon" />
        <div>
          <button className="filter-toggle" onClick={handleFilter}>
            <FaFilter className="filter-icon" />
            Filters
          </button>
          <button className="fab" onClick={handleAddData}>
            <FaPlus style={{ color: "white", fontSize: 24, padding: 4 }} />
            Add Manually
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Transcaction ID</th>
            <th>Customer Full Name</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.TransactionID}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.TransactionID}</td>
              <td>{item.CustomerFullName}</td>
              <td>{item.Date}</td>
              <td>
                {item.Payment === "GPay" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaGooglePay
                      style={{ color: "#34A853", fontSize: 24, padding: 4 }}
                    />
                    <div
                      style={{
                        marginLeft: 8,
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        ****9876
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        EXP 05/24
                      </div>
                    </div>
                  </div>
                )}
                {item.Payment === "VISA" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaCcVisa
                      style={{ color: "#006bff", fontSize: 24, padding: 4 }}
                    />
                    <div
                      style={{
                        marginLeft: 8,
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        ****9876
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        EXP 05/24
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td>${item.Amount}</td>
              <td>
                {item.Status === "Pending" && (
                  <div className="status-icon pending">
                    <FaExclamationTriangle />
                    <span className="status-text">Pending</span>
                  </div>
                )}
                {item.Status === "Completed" && (
                  <div className="status-icon completed">
                    <FaCheckCircle />
                    <span className="status-text">Completed</span>
                  </div>
                )}
              </td>
              <td>
                <FaDownload className="action-icon" />
                <FaTrash className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
