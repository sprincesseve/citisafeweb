import React, { useEffect } from "react";
import Navbar from "../../Navbar";
import {
  Add,
  Close,
  Check,
  VoiceOverOff,
  RecordVoiceOver,
  Download,
  Search,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./styles.css";
import { useState } from "react";
import users from "./users.json";
import StatusSelection from "../../components/StatusSelection";
import stats from "./../../JSON/is_active.json";
import { useSelector } from "react-redux";
import axios from "../../plugins/axios";
import * as XLSX from "xlsx";
import empty from "./../../assets/search-bar.gif";

const cellStylesHeader = {
  cell: {
    color: "black",
    width: 150,
    height: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
};

const cellStylesBody = {
  cell: {
    color: "black",
    height: "auto",
    textAlign: "left",
    width: 150,
    height: 40,
    textAlign: "center",
  },
};

function UserControl(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [userData, setUserData] = useState([]);
  const Token = useSelector((state) => state.auth.token);
  const [addUser, setAddUser] = useState({
    email: "",
    role: "",
    position: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    username: "",
  });

  const [table, setTable] = useState(true);
  const [details, setDetails] = useState(true);
  const [addScreen, setAddScreen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(users);

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 7;

  const lastPageIndex = Math.ceil(userData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, userData.length);
  const visibleData = [];
  for (let i = startIndex; i < endIndex; i++) {
    if (userData[i]) {
      visibleData.push(userData[i]);
    }
  }
  const totalPages = Math.ceil(userData.length / rowsPerPage);

  const filteredUserControl = Array.isArray(userData)
    ? userData.filter((user) => {
        const firstName = user?.first_name || "";
        const lastName = user?.last_name || "";
        const position = user?.position || "";

        return (
          firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          position.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];

  const visibleUserData = filteredUserControl.slice(startIndex, endIndex);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPageIndex));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((item) => {
      const firstName = item.firstName ? item.firstName.toLowerCase() : "";
      const lastName = item.lastName ? item.lastName.toLowerCase() : "";
      const id = item.id ? item.id.toString() : "";

      return (
        firstName.includes(query.toLowerCase()) ||
        lastName.includes(query.toLowerCase()) ||
        id.includes(query)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleRoleChange = (selectedRole) => {
    setAddUser((prevAddUser) => ({
      ...prevAddUser,
      role: selectedRole,
    }));
  };

  const handlePositionChange = (selectedRole) => {
    setAddUser((prevAddUser) => ({
      ...prevAddUser,
      position: selectedRole,
    }));
  };

  // edit user active/inactive
  const [editIsActive, setEditIsActive] = useState("");

  const handleStatusChange = (newStatus) => {
    setEditIsActive(newStatus);
  };

  const handleBack = () => {
    setTable(!table);
    setProceed(!proceed);
  };

  const handleEdit = (rowId) => {
    setEditingRow(rowId);
  };

  const handleDelete = (rowId) => {
    setDeletingRow(rowId);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  const handleSubmit = () => {
    if (
      !addUser.email ||
      !addUser.role ||
      !addUser.position ||
      !addUser.first_name ||
      !addUser.last_name ||
      !addUser.middle_name ||
      !addUser.username
    ) {
      alert("Please fill out all entries to proceed.");
      return;
    }

    axios
      .post("accounts/users/", addUser)
      .then((response) => {
        setAddScreen(!addScreen);
        setTable(!table);

        setUserData({
          email: "",
          role: "",
          position: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          username: "",
        });

        window.location.reload();
        alert("You have successfully created a user.");
      })
      .catch((error) => {
        console.log(error);
        console.log(addUser);
        alert(
          "The email or username might be already registered. Please use a different one."
        );
      });
  };

  const handleDownload = () => {
    const exportData = filteredUserControl.map((item) => ({
      ID: item.id,
      LASTNAME: item.last_name,
      FIRSTNAME: item.first_name,
      MIDDLENAME: item.middle_name,
      ROLE: item.role,
      POSITION: item.position,
      EMAIL: item.email,
      USERNAME: item.username,
      STATUS: item.is_active,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "USERS TABLE");

    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "users_table.xlsx";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.alert("Downloaded successfully");
  };

  const handleCheck = () => {
    // Logic to confirm deletion here
    setDeletingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const handleCancelDelete = () => {
    setDeletingRow(null);
  };

  const offenseCountMap = {};
  filteredData.forEach((item) => {
    if (offenseCountMap[item.name]) {
      offenseCountMap[item.name]++;
    } else {
      offenseCountMap[item.name] = 1;
    }
  });

  useEffect(() => {
    axios
      .get("accounts/users/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setUserData(sortedData);
        console.log(sortedData);
      })
      .catch((error) => {
        window.alert("Error Fetching Users Data");
      });
  }, [Token]);

  return (
    <div className="container1">
      <Navbar />
      <div className="first-layer-control">
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          sx={{
            "& .MuiDialog-paper": {
              minWidth: "40%",
              minHeight: "60%",
            },
          }}
        >
          <DialogTitle>ADD USER</DialogTitle>
          <DialogContent>
            <div className="add-user-container">
              <div className="add-user-subcontainer">
                <div>
                  <TextField
                    label="First Name"
                    style={{ marginBottom: 25, marginRight: 20 }}
                    value={addUser.first_name}
                    onChange={(e) => {
                      setAddUser({
                        ...addUser,
                        first_name: e.target.value,
                      });
                    }}
                  ></TextField>
                  <TextField
                    label="Middle Name"
                    style={{ marginBottom: 25, marginRight: 20 }}
                    value={addUser.middle_name}
                    onChange={(e) => {
                      setAddUser({
                        ...addUser,
                        middle_name: e.target.value,
                      });
                    }}
                  ></TextField>
                </div>
                <div className="cont-select">
                  <TextField
                    label="Last Name"
                    style={{ marginBottom: 25, marginRight: 20 }}
                    value={addUser.last_name}
                    onChange={(e) => {
                      setAddUser({
                        ...addUser,
                        last_name: e.target.value,
                      });
                    }}
                  ></TextField>
                  <TextField
                    label="Username"
                    style={{ marginBottom: 25, marginRight: 20 }}
                    value={addUser.username}
                    onChange={(e) => {
                      setAddUser({
                        ...addUser,
                        username: e.target.value,
                      });
                    }}
                  ></TextField>
                </div>
                <div className="cont-select" style={{ display: "flex" }}>
                  <div>
                    <TextField
                      label="Email"
                      style={{ marginBottom: 25, marginRight: 20 }}
                      value={addUser.email}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          email: e.target.value,
                        });
                      }}
                    ></TextField>
                  </div>
                  <div className="selection-cont">
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel>Position</InputLabel>
                      <Select
                        value={addUser.position} // Assuming addUser.position is the selected value
                        label="Position"
                        onChange={(event) =>
                          handlePositionChange(event.target.value)
                        }
                      >
                        <MenuItem value="">Select Position</MenuItem>
                        <MenuItem value="Traffic Aid">Traffic Aid</MenuItem>
                        <MenuItem value="Office Clerk">Office Clerk</MenuItem>
                        <MenuItem value="Traffic Enforcer">
                          Traffic Enforcer
                        </MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div>
                  <FormControl
                    sx={{
                      minWidth: "46%",
                      "@media (max-width: 600px)": {
                        minWidth: "92%",
                        marginTop: 3,
                      },
                    }}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={addUser.role}
                      label="Role"
                      onChange={(event) => handleRoleChange(event.target.value)}
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="TREASURER">Treasurer</MenuItem>
                      <MenuItem value="ENFORCER">Enforcer</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeModal}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#00B050", color: "white" }}
            >
              CREATE
            </Button>
          </DialogActions>
        </Dialog>

        {table ? (
          <>
            <div className="search-container-user">
              <Search
                className="search-icon-user"
                style={{ position: "absolute", left: "2%", marginTop: 10 }}
              ></Search>
              <input
                value={searchQuery}
                onChange={(event) => handleSearch(event.target.value)}
                className="search-box-user"
              ></input>
              <Button
                onClick={openModal}
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
                <Add style={{}} />
                {window.innerWidth <= 600 ? null : "ADD USER"}
              </Button>
              <Button
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
                onClick={handleDownload}
              >
                <Download style={{}} />
                {window.innerWidth <= 600 ? null : "DOWNLOAD"}
              </Button>
            </div>

            <div className="table-conatiner-user">
              {visibleUserData.length === 0 ? (
                <div className="empty-container">
                  <img
                    src={empty}
                    alt="No matching results"
                    className="empty-image"
                  />
                </div>
              ) : (
                <div className="table-sub-user">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th className="header-title user">ID</th>
                        <th className="header-title user">First Name</th>
                        <th className="header-title user">Middle Name</th>
                        <th className="header-title user">Last Name</th>
                        <th className="header-title user">Role</th>
                        <th className="header-title user">Position</th>
                        <th className="header-title user">Email</th>
                        <th className="header-title user">Username</th>
                        <th className="header-title user status">Status</th>
                        <th className="header-title user">Action</th>
                      </tr>
                    </thead>
                    {visibleUserData.map((user, index) => (
                      <tbody>
                        <tr
                          className={` ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`}
                        >
                          <td className="content-title user">
                            <p className="title-size user">{user.id}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.first_name}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">
                              {user.middle_name}
                            </p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.last_name}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.role}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.position}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.email}</p>
                          </td>
                          <td className="content-title user">
                            <p className="title-size user">{user.username}</p>
                          </td>
                          <td className="content-title user status">
                            <div className="status-container user">
                              <p
                                style={{
                                  fontSize: 12,
                                  display: "flex",
                                  flex: 1,
                                  backgroundColor:
                                    user.is_active === true
                                      ? "#E2F0D9"
                                      : user.is_active === false
                                      ? "#FFD1D1"
                                      : "#EBF9F1",
                                  color:
                                    user.is_active === true
                                      ? "#649F3F"
                                      : user.is_active === false
                                      ? "#D00000"
                                      : "#1F9254",
                                  width: 70,
                                  height: 12,
                                  padding: 7,
                                  textAlign: "center",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: 20,
                                }}
                              >
                                {editingRow === user.id ? (
                                  <div className="status-con-user">
                                    <StatusSelection
                                      label={"Select Status"}
                                      labelSelect={"Select Status"}
                                      json={stats}
                                      width={150}
                                      onStatusChange={handleStatusChange}
                                    ></StatusSelection>
                                  </div>
                                ) : user.is_active === true ? (
                                  `Active`
                                ) : (
                                  <span>
                                    {user.is_active ? "Active" : "Inactive"}
                                  </span>
                                )}
                              </p>
                            </div>
                          </td>
                          <td className="content-title action">
                            {editingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => {
                                    const formData = {
                                      id: user.id,
                                      is_active: editIsActive,
                                    };

                                    axios
                                      .patch(
                                        `accounts/users/${user.id}/`,
                                        formData,
                                        {
                                          headers: {
                                            Authorization: `token ${Token}`,
                                          },
                                        }
                                      )
                                      .then((response) => {
                                        handleSave(user.id);
                                        window.location.reload();
                                      })
                                      .catch((error) => {
                                        window.alert(
                                          "Unsuccessfully Edit User Status"
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
                                  onClick={handleCancelEdit}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : deletingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleCheck(user.id)}
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
                                  onClick={handleCancelDelete}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : (
                              <>
                                {user.is_active ? (
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      color: "green",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <RecordVoiceOver style={{ height: 25 }} />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      color: "red",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <VoiceOverOff style={{ height: 25 }} />
                                  </Button>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
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
                          currentPage === index + 1
                            ? "activePage"
                            : "inactivePage"
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
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserControl;
