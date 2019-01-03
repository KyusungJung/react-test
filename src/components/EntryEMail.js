import React from "react";

const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

const EntryEMail = ({ onClick }) => (
  <div>
    <input type="email" defaultValue="" />
    <Button onClick={onClick}>Entry</Button>
  </div>
);

export default EntryEMail;
