import React, {useEffect, useState} from "react";
import ChangePassword from "../../../components/dealer/ChangePassword";
import EditAccountInfo from "../../../components/logistics/EditAccountInfo";

const Settings = () => {
  const [activeCard, setActiveCard] = useState(0);

  const handleChange = (key) => {
    setActiveCard(key);
  };
  const resetActiveCard = () => {
    setActiveCard(0);
  };
  useEffect(() => {
      window._paq.push(["setUserId", localStorage.getItem("email")]);
      window._paq.push(["trackPageView"]);
  },[]);
  const mainCard = () => {
    return (
      <>
        <h1>Einstellungen</h1>
        <button
          className="setting-link"
          onClick={() => {
            handleChange(1);
          }}
        >
          Account informationen bearbeiten
        </button>
        <br />
        <button
          className="setting-link"
          onClick={() => {
            handleChange(2);
          }}
        >
          Passwort ändern
        </button>
      </>
    );
  };
  const renderCard = () => {
    if (activeCard === 0) {
      return mainCard();
    } else if (activeCard === 1) {
      return <EditAccountInfo reset={resetActiveCard} />;
    } else if (activeCard === 2) {
      return <ChangePassword reset={resetActiveCard} />;
    }
  };
  return <div className="my-page setting-page">{renderCard()}</div>;
};

export default Settings;
