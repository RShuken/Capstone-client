import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import UserProfile from "../../components/Profile";
import EditProfileComponent from '../../components/Profile/EditProfile';

function EditProfile() {
  return (
    <>
      <EditProfileComponent />
    </>
  );
}

export default EditProfile;
