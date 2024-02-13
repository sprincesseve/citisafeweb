import React, { useState } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import sample from "./../../assets/profile.avif";
import { Button, Modal } from "@mui/material";
import {
  Cancel,
  Edit,
  Lock,
  Password,
  RemoveRedEyeOutlined,
  RemoveRedEyeTwoTone,
  Save,
  VisibilityOff,
} from "@mui/icons-material";
import AvatarEditor from "react-avatar-edit";
import InputSearch from "../../components/InputSearch";

function Profile(props) {
  const [edit, setEditInfo] = useState(true);
  const [save, setSave] = useState(true);
  const [editedImage, setEditedImage] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(null);
  const [updatePass, setUpdatePass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [visibility, setVisibility] = useState(true);

  const handleEditInfo = () => {
    setEditInfo(null); // Set edit mode to false
    setDisabled(!disabled);
  };

  const handleSave = () => {
    setEditInfo(true);
    setDisabled(!disabled);
  };

  const handleEditPic = () => {
    setIsAvatarModalOpen(true); // Open the modal
  };

  const handleSavePic = () => {
    //SAVE IMAGE FUNCTION
    setSave(true);
  };

  const handleImageChange = (dataURI) => {
    setEditedImage(dataURI);
  };

  const handleAvatarModalClose = () => {
    setIsAvatarModalOpen(false);
  };

  const handleSaveAvatar = () => {
    setIsAvatarModalOpen(false);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
        <div className="white">
          <div className="imageContainer">
            {edit ? (
              <div>
                <Button
                  className="profileEdit"
                  onClick={handleEditPic}
                  style={{ position: "absolute", color: "white" }}
                >
                  <Edit></Edit>
                </Button>
                <Button
                  className="profileEdit"
                  onClick={() =>
                    setEditInfo(!edit) & setUpdatePass(!updatePass)
                  }
                  style={{
                    position: "absolute",
                    color: "white",
                    marginLeft: "12.5%",
                  }}
                >
                  <Lock></Lock>
                </Button>
              </div>
            ) : null}
            <img
              className="image"
              src={editedImage || sample}
              alt="Avatar"
            ></img>
          </div>
        </div>
      </div>

      <Modal
        className="modal"
        open={isAvatarModalOpen}
        onClose={handleAvatarModalClose}
        aria-labelledby="avatar-modal-title"
        aria-describedby="avatar-modal-description"
      >
        <div className="avatar-modal">
          <h2 id="avatar-modal-title" className="avatar-modal-title">
            Edit Avatar
          </h2>
          <div className="avatar-editor-container">
            <AvatarEditor
              className="Avatar"
              style={{ width: "100%", height: "100%", color: "white" }}
              image={editedImage || sample}
              width={370}
              height={570}
              onCrop={handleImageChange}
              color="white"
              colo
            />
          </div>

          <Button
            className="profileSave"
            onClick={handleSaveAvatar}
            style={{
              position: "absolute",
              color: "white",
              bottom: 170,
              borderColor: "white",
            }}
          >
            <Save
              style={{ fontSize: 39, marginRight: 10, color: "white" }}
            ></Save>
            Save Picture
          </Button>
        </div>
      </Modal>

      <div className="info">
        <h1>Jayde Mike Engracia</h1>
        <h2>TRAFFIC ENFORCER</h2>
        <h3>Treasurer</h3>
        <h4>@JaydeMike</h4>
      </div>

      {edit ? (
        <div className="inputFields">
          <div>
            <Button onClick={handleEditInfo}>
              <Edit style={{ color: "white" }}></Edit>
            </Button>
          </div>
          <div className="inputs">
            <InputSearch
              disabled
              value={"Engracia"}
              label={"Last Name"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"Jayde Mike"}
              label={"First Name"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"@jaydeMike"}
              label={"Username"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"Treasurer"}
              label={"Role"}
              marginRight={30}
            ></InputSearch>
          </div>
          <div className="inputs">
            <InputSearch
              disabled
              value={"TRAFFIC ENFORCER"}
              label={"Position"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"jaydeMike@gmail.com"}
              label={"Email"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"09088277233"}
              label={"Contact No."}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              disabled
              value={"Male"}
              label={"Gender"}
              marginRight={30}
            ></InputSearch>
          </div>
        </div>
      ) : null}

      {disabled ? (
        <div className="inputFields">
          <div>
            <Button onClick={handleSave}>
              <Save style={{ color: "white" }}></Save>
            </Button>
          </div>
          <div className="inputs">
            <InputSearch
              value={"Engracia"}
              label={"Last Name"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"Jayde Mike"}
              label={"First Name"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"@jaydeMike"}
              label={"Username"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"Treasurer"}
              label={"Role"}
              marginRight={30}
            ></InputSearch>
          </div>
          <div className="inputs">
            <InputSearch
              value={"TRAFFIC ENFORCER"}
              label={"Position"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"jaydeMike@gmail.com"}
              label={"Email"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"09088277233"}
              label={"Contact No."}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              value={"Male"}
              label={"Gender"}
              marginRight={30}
            ></InputSearch>
          </div>
        </div>
      ) : null}

      {updatePass ? (
        <div>
          <div className="inputs">
            <InputSearch
              type={visibility ? "password" : "text"}
              value={"asdas"}
              label={"Old Password"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              type={visibility ? "password" : "text"}
              value={"asd"}
              label={"New Password"}
              marginRight={30}
            ></InputSearch>
            <InputSearch
              type={visibility ? "password" : "text"}
              value={"asd"}
              label={"Confirm Password"}
              marginRight={30}
            ></InputSearch>
            <Button onClick={handleVisibility} style={{ color: "white" }}>
              {visibility ? (
                <RemoveRedEyeOutlined></RemoveRedEyeOutlined>
              ) : (
                <VisibilityOff></VisibilityOff>
              )}
            </Button>
          </div>
          <div className="inputs">
            <Button
              style={{ color: "white" }}
              onClick={() => setEditInfo(!edit) & setUpdatePass(!updatePass)}
            >
              <Save></Save>
            </Button>
            <Button
              style={{ color: "white" }}
              onClick={() => setEditInfo(!edit) & setUpdatePass(!updatePass)}
            >
              <Cancel></Cancel>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
