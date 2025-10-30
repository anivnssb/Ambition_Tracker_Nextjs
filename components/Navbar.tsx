import * as React from "react";
import ThemeToggle from "./ui/ThemeToggleButton";

const pages = ["Create Notes"];
const settings = ["Account", "Logout"];

const Navbar: React.FC = () => {
  return (
    <div style={{ background: "red", width: "100%", position: "fixed" }}>
      Navbar
      <ThemeToggle />
    </div>
  );
};
export default Navbar;
