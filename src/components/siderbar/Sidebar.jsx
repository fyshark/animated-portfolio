import { useState } from "react";
import { motion } from "framer-motion";
import "./sidebar.scss";
import Links from "./links/Links";
import ToggleButton from "./toggleButton/toggleBotton";

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const variants = {
    open:{
      clipPath: "circle(1500px at 50px 50px)",
      type: "spring",
      stiffness: 20
    },

    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition:{
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  const backgroundColor = "#fccf61";

  return (
    <motion.div className="sidebar" animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants} style={{ backgroundColor }} >
        <Links onLinkClick={closeSidebar} />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

export default Sidebar