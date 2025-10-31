import * as React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-b-gray-700 flex justify-between p-4">
      <p className="text-black dark:text-white"> Tracker</p>
      <ThemeToggle />
    </div>
  );
};
export default Navbar;
