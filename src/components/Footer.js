import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Footer() {
  return (
    <footer>
      <Link to="/impressum">Impressum</Link>
      <Link to="/datenschutz">Datenschutz</Link>
      <Link to="/agb">AGB</Link>
    </footer>
  );
}

export default Footer;
