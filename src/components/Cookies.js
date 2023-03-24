import React, { useState } from "react";
import CookiesPolicy from "../common/modals/CookiesPolicy";


const Cookies = () => {
    const [display, setDisplay] = useState(false);
    const [cookiesShow, setCookiesShow] = useState(false);
    const hideCookieInfo = () => {
        setCookiesShow(false);
    }
  return (
      <>
    <div className="cookies-card" style={{ display: display && "none" }}>
      <img src="/assets/icons/logo.svg" alt="brand" />
      <p>
        Wir verwenden Cookies. Viele sind notwendig, um die Website und ihre
        Funktionen zu betreiben, andere sind für statistische oder
        Marketingzwecke. Mit der Entscheidung „Nur essentielle Cookies
        akzeptieren“ werden wir Ihre Privatsphäre respektieren und keine Cookies
        setzen, die nicht für den Betrieb der Seite notwendig sind.
      </p>
      <div>
        <button
          id="ot-sdk-btn" className="ot-sdk-show-settings"
          onClick={() => {
              console.log('click')
              window.utag.link({
                  page_name : "batteries",            // Contains a user-friendly name for the page e.g. the title
                  page_category : "batteries",    // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
                  page_subcategory : "batteries",             // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
                  page_type : "",                            // Contains the main type for the page like landing  news article error-page
                  product_prd : "30530121",                  // Contains product prd  - multiple values should be comma-separated.
                  product_name : "CEGESOFT® HF 52"
              })
          }}
        >
          Alle verwenden
        </button>
        <button
          onClick={() => {
            setDisplay(true);
          }}
        >
          Nur essenzielle
        </button>
      </div>
    </div>
          <CookiesPolicy
              show={cookiesShow}
              close={hideCookieInfo}
          />
    </>
  );
};

export default Cookies;
