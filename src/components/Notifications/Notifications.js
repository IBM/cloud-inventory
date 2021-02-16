import React, { useState } from "react";
import { ToastNotification } from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const Notifications = () => {
  const [notification, setNotifications] = useState();

  ipcRenderer.on("notification", (event, arg) => {
    setNotifications(arg);
  });

  return (
    <div className="bx--notification">
      {notification && (
        <ToastNotification
          caption={notification.caption}
          iconDescription="Close notification"
          subtitle={
            <span kind={notification.kind}>{notification.description}</span>
          }
          timeout={5000}
          onCloseButtonClick={() => {
            setNotifications();
          }}
          title={notification.title}
        />
      )}
    </div>
  );
};

export default Notifications;
