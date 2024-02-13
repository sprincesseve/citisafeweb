import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import {
  Edit,
  Close,
  Check,
  Search,
  Download,
  RestartAlt,
} from "@mui/icons-material";
import StatusSelection from "../../components/StatusSelection";
import StatSelect from "./../../JSON/StatSelect.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../plugins/axios";
import * as XLSX from "xlsx";
import SelectFilter from "./../../components/SelectFilter";
import AtoZ from "./../../components/AtoZ";
import SortDate from "../../components/SortDate";
import empty from "./../../assets/search-bar.gif";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalPaper: {
    outline: "none",
    background: "white",
    borderRadius: 10,
    padding: theme.spacing(3),
  },
});

const cellStylesHeader = {
  cell: {
    color: "black",
    height: 5,
    lineHeight: 1,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
};

const cellStylesBody = {
  cell: {
    color: "black",
    height: "auto",
    textAlign: "left",
    width: 150,
    height: "auto",
    textAlign: "center",
    fontSize: "12px",
    lineHeight: 1,
  },
};

if (window.innerWidth <= 600) {
  cellStylesHeader.cell.width = 100;
  cellStylesBody.cell.width = 100;
}

function Violation({ navigation }) {
  const Role = useSelector((state) => state.auth.role);
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [checkedStatuses, setCheckedStatuses] = useState({
    PENDING: false,
    PAID: false,
    OVERDUE: false,
    DROPPED: false,
    SERVICE: false,
  });
  const [sortOrder, setSortOrder] = useState("ascending");
  const [ticketData, setTicketData] = useState([]);
  const Token = useSelector((state) => state.auth.token);
  const [editTicketStatus, setEditTicketStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editingRows, setEditingRows] = useState({});
  const [deletingRows, setDeletingRows] = useState({});
  const [originalTicketData, setOriginalTicketData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  const lastPageIndex = Math.ceil(ticketData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, ticketData.length);
  const visibleData = ticketData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ticketData.length / rowsPerPage);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPageIndex));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleStatusChange = (newStatus) => {
    setEditTicketStatus(newStatus);
  };

  const handleOpenModal = (MFRTA_TCT_NO) => {
    console.log("Opening modal for ticket:", MFRTA_TCT_NO);
    console.log("Selected ticket:", selectedTicket);
    setIsModalOpen(true);
    setSelectedTicket(MFRTA_TCT_NO);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (Array.isArray(originalTicketData)) {
      const filteredData = originalTicketData.filter((item) => {
        if (item) {
          const firstName = item.driver_info.first_name.toLowerCase();
          const middleInitial = item.driver_info.middle_initial.toLowerCase();
          const lastName = item.driver_info.last_name.toLowerCase();

          const nameMatches =
            firstName.includes(query.toLowerCase()) ||
            middleInitial.includes(query.toLowerCase()) ||
            lastName.includes(query.toLowerCase());

          const tctNoString = item.MFRTA_TCT_NO.toString();
          const tctNoMatches = tctNoString
            .toLowerCase()
            .includes(query.toLowerCase());

          return nameMatches || tctNoMatches;
        }
        return false;
      });

      setTicketData(filteredData);
    }
  };

  const handleDownload = (data, fileName, sheetName) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array");
      return;
    }

    const exportData = data.map((item) => ({
      ID: item.id,
      LASTNAME: item.driver_info.last_name,
      FIRSTNAME: item.driver_info.first_name,
      MIDDLENAME: item.driver_info.middle_name,
      ADDRESS: item.driver_info.address,
      LICENSE_NO: item.driver_info.license_number,
      TYPE: item.classification,
      DATE_OF_BIRTH: item.driver_info.birthdate,
      NATIONALITY: item.driver_info.nationality,
      PLATE_NO: item.vehicle_info.plate_number,
      MAKE: item.vehicle_info.make,
      MODEL: item.vehicle_info.vehicle_model,
      COLOR: item.vehicle_info.color,
      CLASS: item.vehicle_info.vehicle_class,
      BODY_MAARKS: item.vehicle_info.body_markings,
      REGISTERED_OWNER: item.vehicle_info.name,
      REGISTERED_ADDRESS: item.vehicle_info.address,
      CONTACT_NO: item.vehicle_info.contact_number,
      DATE_AND_TIME_OF_VIOLATION: item.date_issued,
      PLACE_OF_VIOLATION: item.place_violation,
      APPREHENDING_OFFICER: `${item.user_ID.first_name} ${item.user_ID.middle_name} ${item.user_ID.last_name}`,
      TICKET_STATUS: item.ticket_status,
      OFFENSE: item.driver_info.offenses_count,
      PENALTY: item.penalty_amount,
      VIOLATION: item.violation_info.violations_info.join(", "),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.alert("Downloaded successfully");
    console.log(data);
  };

  const handleEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: true,
    }));
  };

  const handleDelete = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: true,
    }));
  };

  const handleSave = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const handleCheck = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: false,
    }));
  };

  const handleCancelEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const filterData = (statusFilters, dateFilter) => {
    let filteredData = [...originalTicketData]; // Use a copy to avoid modifying the original array

    // Filter by status
    if (statusFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        statusFilters.includes(item.ticket_status)
      );
    }

    // Filter by date
    if (dateFilter.startDate && dateFilter.endDate) {
      const startDate = dateFilter.startDate.setHours(0, 0, 0, 0); // Set time to midnight
      const endDate = dateFilter.endDate.setHours(23, 59, 59, 999); // Set time to the last millisecond

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date_issued).getTime(); // Get timestamp

        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setTicketData(filteredData);
  };

  const handleStatusChangeFilter = (status) => {
    const newCheckedStatuses = {
      ...checkedStatuses,
      [status]: !checkedStatuses[status],
    };
    setCheckedStatuses(newCheckedStatuses);
    const selectedStatuses = Object.keys(newCheckedStatuses).filter(
      (s) => newCheckedStatuses[s]
    );

    filterData(selectedStatuses, selectedDate);
  };

  const filterAZ = () => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);

    const sortedData = [...ticketData].sort((a, b) => {
      return sortOrder === "ascending"
        ? a.MFRTA_TCT_NO - b.MFRTA_TCT_NO
        : b.MFRTA_TCT_NO - a.MFRTA_TCT_NO;
    });

    setTicketData(sortedData);
  };

  const filterStatus = (selectedStatuses) => {
    const statusesToFilter = Object.keys(selectedStatuses).filter(
      (status) => selectedStatuses[status]
    );

    if (statusesToFilter.length === 0) {
      // If no checkboxes are checked, display all
      setTicketData(originalTicketData);
      return;
    }

    const filteredData = originalTicketData.filter((item) =>
      statusesToFilter.includes(item.ticket_status)
    );

    setTicketData(filteredData);
  };

  const handleDateSort = (selectedDate) => {
    console.log("Selected Date Range:", selectedDate);
    setSelectedDate(selectedDate);
    filterData(
      Object.keys(checkedStatuses).filter((s) => checkedStatuses[s]),
      selectedDate
    );
  };

  const handleCancelFilter = () => {
    setTicketData(originalTicketData);
  };

  const handleRestart = () => {
    // Reset date filter
    const initialDateFilter = {
      startDate: null,
      endDate: null,
    };
    setSelectedDate(initialDateFilter);

    // Reset status filter
    const initialCheckedStatuses = {
      PENDING: false,
      PAID: false,
      OVERDUE: false,
      DROPPED: false,
      SERVICE: false,
    };
    setCheckedStatuses(initialCheckedStatuses);
    filterData(initialCheckedStatuses, initialDateFilter);
  };
  // websocket

  useEffect(() => {
    const socket = new WebSocket(
      "wss://etcmf.keannu1.duckdns.org/ws/ticketnotification/"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data.type === "ticket.notification" ||
        data.type === "ticket.status_update"
      ) {
        axios
          .get("ticket/register/", {
            headers: {
              Authorization: `token ${Token}`,
            },
          })
          .then((response) => {
            const sortedData = response.data.sort((a, b) => {
              return new Date(b.date_issued) - new Date(a.date_issued);
            });

            // Update the state with the new data
            setTicketData(sortedData);
            setOriginalTicketData(sortedData);
          })
          .catch((error) => {
            window.alert("Error Fetching");
          });
      }
    };

    return () => {
      socket.close();
    };
  }, [Token]);

  useEffect(() => {
    axios
      .get("ticket/register/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        const sortedData = response.data.sort((a, b) => {
          return new Date(b.date_issued) - new Date(a.date_issued);
        });

        setTicketData(sortedData);
        setOriginalTicketData(sortedData);
      })
      .catch((error) => {
        window.alert("Error Fetching");
      });
  }, [Token]);

  return (
    <div className="violation-container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>
      <div className="navbar-container-2"></div>
      <div className="first-layer-violation">
        <div className="search-container-violation">
          <Search
            className="search-icon"
            style={{ position: "absolute", left: "3.5%", marginTop: 10 }}
          ></Search>
          <input
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            className="search-box"
          />
          <Button
            onClick={() =>
              handleDownload(ticketData, "users_table.xlsx", "Sheet 1")
            }
            className="add-user-btn"
            style={{
              backgroundColor: "#3E7C1F",
              borderRadius: 40,
              color: "white",
              paddingRight: 10,
              paddingLeft: 10,
              height: 40,
              marginLeft: 10,
            }}
          >
            <Download style={{}} />
            {window.innerWidth <= 600 ? null : "DOWNLOAD"}
          </Button>
        </div>
        <div className="container-filter">
          <div
            style={{
              marginRight: 10,
              display: "flex",
              flexDirection: "row",
              borderRadius: 10,
              border: "1px solid #c4c4c4",
            }}
          >
            <div
              style={{ marginRight: 20, display: "flex", alignItems: "center" }}
            >
              <div className="sub-filterStatus">
                <SelectFilter
                  label={"PENDING"}
                  value={"PENDING"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.PENDING}
                />
                <SelectFilter
                  label={"PAID"}
                  value={"PAID"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.PAID}
                />
                <SelectFilter
                  label={"SERVICE"}
                  value={"COMMUNITY SERVICE"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.SERVICE}
                />
              </div>
              <div className="sub-filterStatus sub">
                <SelectFilter
                  label={"OVERDUE"}
                  value={"OVERDUE"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.OVERDUE}
                />
                <SelectFilter
                  label={"DROPPED"}
                  value={"DROPPED"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.DROPPED}
                />
              </div>
            </div>
          </div>
          <div className="other-filter">
            <div>
              <AtoZ onClicks={[filterAZ]}></AtoZ>
            </div>
            <div>
              {/*SORTING DATE HERE*/}
              <SortDate
                onCancel={handleCancelFilter}
                onDateSelect={handleDateSort}
              />
            </div>
            <div className="restart">
              <Button style={{ color: "green" }} onClick={handleRestart}>
                <RestartAlt></RestartAlt>
              </Button>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "3%" }}>
          <p>TOTAL ROWS: {ticketData.length}</p>
        </div>
        <div className="table-conatiner-violation">
          {ticketData.map((item, index) => (
            <Dialog
              key={item.MFRTA_TCT_NO}
              open={selectedTicket === item.MFRTA_TCT_NO}
              onClose={handleCloseModal}
              sx={{
                "& .MuiDialog-paper": {
                  minWidth: "60%",
                  minHeight: "40%",
                },
              }}
            >
              <DialogTitle>{item.MFRTA_TCT_NO}</DialogTitle>
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <table>
                    <tr>
                      <td className="row-details">Name</td>
                      <td className="row-details-value">
                        {item.driver_info.first_name}{" "}
                        {item.driver_info.middle_initial}{" "}
                        {item.driver_info.last_name}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Address</td>
                      <td className="row-details-value">
                        {item.driver_info.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">License No.</td>
                      <td className="row-details-value">
                        {item.driver_info.license_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Type</td>
                      <td className="row-details-value">
                        {item.driver_info.classification}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Date of Birth</td>
                      <td className="row-details-value">
                        {item.driver_info.birthdate}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Nationality</td>
                      <td className="row-details-value">
                        {item.driver_info.nationality}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Plate No.</td>
                      <td className="row-details-value">
                        {item.vehicle_info.plate_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Make</td>
                      <td className="row-details-value">
                        {item.vehicle_info.make}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Model</td>
                      <td className="row-details-value">
                        {item.vehicle_info.vehicle_model}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Color</td>
                      <td className="row-details-value">
                        {item.vehicle_info.color}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Class</td>
                      <td className="row-details-value">
                        {item.vehicle_info.vehicle_class}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Body Markings</td>
                      <td className="row-details-value">
                        {item.vehicle_info.body_markings}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner</td>
                      <td className="row-details-value">
                        {item.vehicle_info.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner Address</td>
                      <td className="row-details-value">
                        {item.vehicle_info.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Contact No.</td>
                      <td className="row-details-value">
                        {item.vehicle_info.contact_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Date & Time of Violation</td>
                      <td className="row-details-value">{item.date_issued}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Place of Violation</td>
                      <td className="row-details-value">
                        {item.place_violation}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Apprehending Officer</td>
                      <td className="row-details-value">
                        {item.user_ID.first_name} {item.user_ID.middle_name}{" "}
                        {item.user_ID.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Ticket Status</td>
                      <td className="row-details-value">
                        {item.ticket_status}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Penalty</td>
                      <td className="row-details-value">
                        {item.penalty_amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Violation</td>
                      <td className="row-details-value">
                        {item.violation_info.violations_info.map(
                          (violation, index) => (
                            <div key={index}>{violation}</div>
                          )
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="warning">
                  CLOSE
                </Button>
              </DialogActions>
            </Dialog>
          ))}

          <div className="violation-table-container">
            {visibleData.length === 0 ? (
              <div className="empty-container">
                <img
                  src={empty}
                  alt="No matching results"
                  className="empty-image"
                />
              </div>
            ) : (
              <div className="table-flex">
                <table className="violation-table">
                  <thead>
                    <tr>
                      <th className="header-title">Tracking #</th>
                      <th className="header-title">Name</th>
                      <th className="header-title">Violation</th>
                      <th className="header-title">Date</th>
                      <th className="header-title">Offense</th>
                      <th className="header-title">Apprehending Officer</th>
                      <th className="header-title">Penalty</th>
                      <th className="header-title">Status</th>
                      {Role === "TREASURER" && (
                        <>
                          <th className="header-title">Action</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  {visibleData.map((item, index) => (
                    <tbody>
                      <tr
                        className={` ${
                          index % 2 === 0 ? "even-row" : "odd-row"
                        }`}
                      >
                        <td className="content-title">
                          <div className="container-ticket">
                            <a
                              className="ticket"
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                handleOpenModal(item.MFRTA_TCT_NO);
                              }}
                            >
                              <p className="title-size">{item.MFRTA_TCT_NO}</p>
                            </a>
                          </div>
                        </td>
                        <td className="content-title">
                          <p className="title-size">
                            {item.driver_info.first_name}{" "}
                            {item.driver_info.middle_initial}{" "}
                            {item.driver_info.last_name}{" "}
                          </p>
                        </td>
                        <td className="content-title">
                          {item.violation_info.violations_info.map(
                            (violation, index) => (
                              <div key={index}>
                                <p className="title-size">{violation}</p>
                              </div>
                            )
                          )}
                        </td>
                        <td className="content-title">
                          <p className="title-size">{item.date_issued}</p>
                        </td>
                        <td className="content-title">
                          <p className="title-size">
                            {item.driver_info.offenses_count}
                          </p>
                        </td>
                        <td className="content-title">
                          <p className="title-size">
                            {item.user_ID.first_name} {item.user_ID.middle_name}{" "}
                            {item.user_ID.last_name}{" "}
                          </p>
                        </td>
                        <td className="content-title">
                          <p className="title-size">{item.penalty_amount}</p>
                        </td>
                        <td className="content-title status">
                          <div className="status-container">
                            <p
                              style={{
                                flex: 1,
                                fontWeight: 540,
                                fontSize: 13,
                                backgroundColor:
                                  item.ticket_status === "OVERDUE"
                                    ? "#FFC5C5"
                                    : item.ticket_status === "PAID"
                                    ? "#E2F0D9"
                                    : item.ticket_status === "PENDING"
                                    ? "#BDD7EE"
                                    : item.ticket_status === "DROPPED"
                                    ? "#FFF2CC"
                                    : "#FFC1F8",
                                color:
                                  item.ticket_status === "OVERDUE"
                                    ? "#C00000"
                                    : item.ticket_status === "PAID"
                                    ? "#70AD47"
                                    : item.ticket_status === "PENDING"
                                    ? "#0070C0"
                                    : item.ticket_status === "DROPPED"
                                    ? "#7F6000"
                                    : "#C400AD",
                                width: 50,
                                padding: 5,
                                textAlign: "center",
                                borderRadius: 20,
                              }}
                            >
                              {editingRows[item.MFRTA_TCT_NO] ? (
                                <div>
                                  <StatusSelection
                                    label={"Select Status"}
                                    labelSelect={"Select Status"}
                                    json={StatSelect}
                                    width={150}
                                    onStatusChange={handleStatusChange}
                                  ></StatusSelection>
                                </div>
                              ) : item.ticket_status === "Overdue" ? (
                                `Overdue`
                              ) : (
                                <span>{item.ticket_status}</span>
                              )}
                            </p>
                          </div>
                        </td>
                        {Role === "TREASURER" && (
                          <td className="content-title status">
                            {editingRows[item.MFRTA_TCT_NO] ? (
                              <div className="check-close">
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 0,
                                  }}
                                  onClick={() => {
                                    const formData = {
                                      MFRTA_TCT_NO: item.MFRTA_TCT_NO,
                                      ticket_status: editTicketStatus,
                                    };
                                    console.log(formData);

                                    axios
                                      .patch(
                                        `ticket/register/${item.MFRTA_TCT_NO}/`,
                                        formData,
                                        {
                                          headers: {
                                            Authorization: `token ${Token}`,
                                          },
                                        }
                                      )
                                      .then((response) => {
                                        console.log(response.data);
                                        handleSave(item.MFRTA_TCT_NO);
                                      })
                                      .catch((error) => {
                                        window.alert(
                                          "Unsuccessfully Edit Penalty Status"
                                        );
                                        console.log(error);
                                      });
                                  }}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={() =>
                                    handleCancelEdit(item.MFRTA_TCT_NO)
                                  }
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </div>
                            ) : deletingRows[item.MFRTA_TCT_NO] ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleCheck(item.MFRTA_TCT_NO)}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      color: "black",
                                      marginLeft: 10,
                                    }}
                                    onClick={() =>
                                      handleEdit(item.MFRTA_TCT_NO)
                                    }
                                  >
                                    <Edit style={{ height: 25 }} />
                                  </Button>
                                </div>
                              </>
                            )}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  ))}
                </table>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    height: 50,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pagination">
        <div className="label-page">
          <Button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            PREVIOUS
          </Button>
          {Array.from({ length: totalPages }, (_, index) => {
            if (
              totalPages <= 4 ||
              index + 1 === 1 ||
              index + 1 === totalPages ||
              Math.abs(currentPage - (index + 1)) <= 1
            ) {
              return (
                <button
                  style={{
                    border: 0,
                    marginRight: 10,
                    height: 40,
                    width: 40,
                    color: currentPage === index + 1 ? "white" : "black",
                    borderRadius: 10,
                    backgroundColor:
                      currentPage === index + 1 ? "#3e7c1f" : "#e0e0e0",
                    fontSize: 20,
                  }}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? "activePage" : "inactivePage"
                  }
                >
                  {index + 1}
                </button>
              );
            } else if (Math.abs(currentPage - (index + 1)) === 2) {
              return <span key={index}>...</span>;
            }
            return null;
          })}
          <Button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={currentPage === lastPageIndex}
            onClick={nextPage}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Violation;
