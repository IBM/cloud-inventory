import React, { useState, forwardRef, useImperativeHandle } from "react";

import { Modal, TextInput } from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const AccountForm = forwardRef((props, ref) => {
  const [openForm, setOpenForm] = useState(false);
  //Guarda os valores dos campos do formulario
  const [accountName, setAccountName] = useState("");
  const [userNameApi, setUserNameApi] = useState("");
  const [classicApiKey, setClassicApiKey] = useState("");
  const [cloudApiKey, setCloudApiKey] = useState("");

  //Guarda se os campos estao valido ou invalidos
  const [accountNameValidate, setAccountNameValidate] = useState(false);
  const [userNameApiValidate, setUserNameApiValidate] = useState(false);
  const [classicApiKeyValidate, setClassicApiKeyValidate] = useState(false);
  const [cloudApiKeyValidate, setCloudApiKeyValidate] = useState(false);

  //Funcao para abrir o formulario
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  //Funcao para resetar o formulario
  const handleResetForm = () => {
    setOpenForm(false);
    setAccountName("");
    setUserNameApi("");
    setClassicApiKey("");
    setCloudApiKey("");
    setAccountNameValidate(false);
    setUserNameApiValidate(false);
    setClassicApiKeyValidate(false);
    setCloudApiKeyValidate(false);
  };

  //Funcao para validar o formulario
  const handleValidateForm = () => {
    const _accountNameValidate = accountName.length <= 0 ? true : false;
    const _userNameApi = userNameApi.length <= 0 ? true : false;
    const _classicApiKey = classicApiKey.length <= 0 ? true : false;
    const _cloudApiKey = cloudApiKey.length <= 0 ? true : false;
    setAccountNameValidate(_accountNameValidate);
    setUserNameApiValidate(_userNameApi);
    setClassicApiKeyValidate(_classicApiKey);
    setCloudApiKeyValidate(_cloudApiKey);

    return _accountNameValidate ||
      _userNameApi ||
      _classicApiKey ||
      _cloudApiKey
      ? true
      : false;
  };

  //Funcao para adicionar uma conta
  const handleAddAccount = (event) => {
    const formValid = !handleValidateForm();
    if (formValid) {
      ipcRenderer.send("account:add", {
        accountName,
        userNameApi,
        classicApiKey,
        cloudApiKey,
      });
      handleResetForm();
      window.location.reload(true);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      openForm: handleOpenForm,
    };
  });
  return (
    openForm && (
      <Modal
        hasForm
        modalHeading="Edit Account Settings"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        selectorPrimaryFocus="#accountNameInput"
        open={openForm}
        onRequestClose={(event) => {
          handleResetForm();
        }}
        onRequestSubmit={(event) => handleAddAccount(event)}
      >
        <TextInput
          onChange={(event) => {
            setAccountName(event.target.value);
          }}
          id="accountNameInput"
          labelText="Account Name"
          invalidText="This field is required"
          placeholder="Enter an account name..."
          invalid={accountNameValidate}
        />
        <TextInput
          onChange={(event) => {
            setUserNameApi(event.target.value);
          }}
          id="userNameInput"
          labelText="API User Name"
          placeholder="Enter api user name..."
          invalidText="This field is required"
          invalid={userNameApiValidate}
        />
        <TextInput
          onChange={(event) => {
            setClassicApiKey(event.target.value);
          }}
          id="classicApiKeyInput"
          labelText="Classic Infrastructure API Key"
          placeholder="Enter classic infrastructure apikey..."
          invalidText="This field is required"
          invalid={classicApiKeyValidate}
        />
        <TextInput
          onChange={(event) => {
            setCloudApiKey(event.target.value);
          }}
          id="cloudApiKeyInput"
          labelText="IBM Cloud API Key"
          placeholder="Enter ibm cloud apikey..."
          invalidText="This field is required"
          invalid={cloudApiKeyValidate}
        />
      </Modal>
    )
  );
});

export default AccountForm;
