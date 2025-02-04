import { Modal, Button } from "antd";
import { useState } from "react";

const LocationPrompt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location Enabled", position.coords);
        setIsModalVisible(false);
      },
      (error) => {
        alert("Please enable location in your device settings.");
        window.location.href = "chrome://settings/content/location"; // Opens location settings on Chrome
      }
    );
  };

  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>Enable Location</Button>
      <Modal
        title="Enable Location"
        visible={isModalVisible}
        onOk={handleEnableLocation}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Enable"
        cancelText="Cancel"
      >
        <p>Your device's location is required for the app to function properly.</p>
      </Modal>
    </div>
  );
};

export default LocationPrompt;
