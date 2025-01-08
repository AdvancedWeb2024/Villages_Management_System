import React, { useEffect, useState } from 'react';

function Notification({ msg }) {
  const [visible, setVisible] = useState(true);

  // run one time on load

  useEffect(() => {

    // show msg to 3 sec
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;  

  return (
    <div style={{
      position: "fixed",
      top: "0%",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      fontSize: "18px",
      textAlign: "center",
      margin: "0",
      width: "100%",
    }}>
      {msg || "Added successfully!"}
    </div>
  );
}

export default Notification;
