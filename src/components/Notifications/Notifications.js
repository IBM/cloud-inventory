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
          iconDescription="Close notification"
          title={notification.title}
          subtitle={
            <span kind={notification.kind}>{notification.description}</span>
          }
          timeout={5000}
          caption={notification.caption}
          onCloseButtonClick={() => {
            setNotifications();
          }}
        />
      )}
    </div>
  );
};

export default Notifications;
