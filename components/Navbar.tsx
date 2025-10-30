import * as React from "react";

const pages = ["Create Notes"];
const settings = ["Account", "Logout"];

const Navbar: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark border-b border-b-border-light dark:border-b-border-dark flex justify-between p-4">
      <p className="text-black dark:text-white"> Tracker</p>
    </div>
  );
};
export default Navbar;
