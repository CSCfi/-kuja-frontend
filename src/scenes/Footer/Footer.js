import React from "react";
import { Leijona } from "modules/styles";

const Footer = () => {
  return (
    <div className="flex bg-white border-green-light border-t-2 text-xxs p-4">
      <div>
        <Leijona />
      </div>
      <div className="flex flex-col justify-center ml-10">
        <p className="mt-4 mb-2">OPETUS- JA KULTTUURIMINISTERIÖ</p>
        <p className="my-1">PL 29, 00023 VALTIONEUVOSTO</p>
        <p className="mt-2">
          PUH. 029 533 0004, <a href="http://www.minedu.fi">WWW.MINEDU.FI</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
