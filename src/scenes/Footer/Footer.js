import React from "react";
import { Leijona } from "modules/styles";

const Footer = () => {
  return (
    <div className="flex justify-center bg-white border-green-light border-t-2 text-xxs p-4">
      <div className="flex flex-col sm:flex-row">
        <div>
          <Leijona />
        </div>
        <div className="flex flex-col justify-center sm:ml-10 text-center sm:text-left">
          <p className="mt-2 pt-1 mb-1">OPETUS- JA KULTTUURIMINISTERIÖ</p>
          <p>PL 29, 00023 VALTIONEUVOSTO</p>
          <p className="mt-1">
            PUH. 029 533 0004, <a href="http://www.minedu.fi">WWW.MINEDU.FI</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
