//The code defines a functional component called 'DataTable' that displays a table of data with search and filter functionality
// The component imports React and some hooks {'useState' and 'useEffect'} from the React library. It also imports a CSS file for styling the table
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataTable.css";
// import dataSet from "./data.json";

/*import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaGooglePay,
} 
from "react-icons/fa";
*/
//import { FaCcVisa } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// Loader component
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

// Hooks allow function components to have access to state and other React features
//props
const DataTable = () => {
  // console.log("OPROS: ", props);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [isLoading, setIsLoading] = useState(true);

  /*
   The component uses the 'useEffect' hook to fetch data from a JSON file called 'data.json' when the component mounts.The fetched data is then stored
   in the 'data' state using the 'setData' function.
   */
  useEffect(() => {
    //setData(dataSet);
    fetchData();
  }, []);

  // console.log("DATA: ", data);
  /*
   The component defines two event handlers:
   > 'handleSearch' is called when the user types in the search input.It updates the 'searchTerm' state with the current value of the input
   > 'handlefilter' is called when the user clicks the 'Filter by status' button or selects a status from the dropdown .It updates the 'statusFilter' 
   state with the current value of the button or dropdown 
    */

  /*
   > In the 'fetchdata' function , AXIOS is used to make a GET request to the API endpoint
   > axios.get is used to send a GET request to the specified URL.
   > The response from the server is stored in the 'response' variable.
   > response.data contains the JSON data returned from the server
   > The fetched data is then stored in the component's state using setData.
   > Axios allows you to handle errors using try-catch blocks. If there's an error during the request, it will be caught in the catch block, and an error message will be logged to the console
   */
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://605dd8879386d200171bb5e5.mockapi.io/api/v1/transactions"
      );
      const jsonData = response.data;
      setData(jsonData);
      setIsLoading(false); // Set loading to false after the data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false even if there's an error
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };
  const handleFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
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
      (item.transactionId &&
        item.transactionId.toLowerCase().includes(searchTerm)) ||
      (item.customerFullName &&
        item.customerFullName.toLowerCase().includes(searchTerm)) ||
      (item.amount &&
        item.amount.toString().toLowerCase().includes(searchTerm));

    const matchesStatusFilter =
      !statusFilter || (item.Status && item.Status === statusFilter);

    return matchesSearchTerm && matchesStatusFilter;
  });

  console.log("searchTerm:", searchTerm);
  console.log("statusFilter:", statusFilter);
  console.log("filteredData:", filteredData);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  /*
The component renders a table with a search input , a "Filter by status" button , a dropdown for selecting a status filter , and a table body that contains the 
'filteredData' array . The 'filteredData' array is mapped to a table row for each item.
*/

  //The 'return' keyword in the 'DataTable.js' file is used to render the UI of the 'DataTable' component
  return (
    <div>
      <h2>Transactions</h2>
      <div className="transaction-toolbar">
        <div className="search-bar">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="status">
          <div className="button-group">
            <button className="filter-toggle" onClick={handleFilter}>
              <FaFilter className="filter-icon" />
              Filters
            </button>
            <button className="add-manually-btn" onClick={handleAddData}>
              <FaPlus style={{ color: "white", fontSize: 14 }} />
              Add Manually
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item.transactionId}</td>
                  <td>{item.customerFullName}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.paymentMethod}</td>
                  <td>${item.amount}</td>
                  <td>{item.status}</td>
                  <td>
                    <FaDownload className="action-icon" />
                    <FaTrash className="action-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={paginationContainerStyle} className="pagination">
            {/* Pagination buttons here */}
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "pagination-button active"
                      : "pagination-button"
                  }
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;

/*
Define Variables:

currentPage: Represents the current page number.
itemsPerPage: Specifies the number of items to display per page.
indexOfLastItem: Calculates the index of the last item on the current page.
indexOfFirstItem: Calculates the index of the first item on the current page.
currentItems: Extracts the items to display on the current page from the filtered data array.
Pagination Buttons:

paginationButtons array is generated dynamically based on the total number of items and the itemsPerPage.
The length of paginationButtons array is calculated using Math.ceil(filteredData.length / itemsPerPage), which gives the total number of pages needed to display all the items.
Each button represents a page number and is created using the Array.from() method, ranging from 1 to the total number of pages.
Each button has an onClick event handler that calls the paginate() function with the corresponding page number.
The className of each button is conditionally assigned based on whether it represents the current page (currentPage === index + 1). If it does, it gets the "pagination-button active" class, indicating that it's the current page.
Pagination Functionality:

The paginate() function is called when a pagination button is clicked.
It takes the page number as an argument and updates the currentPage state accordingly, causing the component to re-render with the items of the selected page displayed.




*/
