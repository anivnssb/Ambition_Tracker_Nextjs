import * as React from "react";

const pages = ["Create Notes"];
const settings = ["Account", "Logout"];

const Navbar: React.FC = () => {
  return (
    <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border-b border-b-[var(--color-border-light)] dark:border-b-[var(--color-border-dark)] flex justify-between p-4">
      <p className="text-black dark:text-white"> Tracker</p>
    </div>
  );
};
export default Navbar;
