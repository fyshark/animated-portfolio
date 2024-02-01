import { useRef } from "react";
import "./parallax.scss"
import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = ({ type }) => {
    const ref = useRef()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    let backgroundImage;
    let displayText;
    switch (type) {
        case "content":
            backgroundImage = "/planets.png";
            displayText = "Content";
            break;
        case "projects":
            backgroundImage = "/sun.png";
            displayText = "Projects";
            break;
        // case "portfolio":
        //     backgroundImage = "/camera.png";
        //     displayText = "Portfolio";
        //     break;
        default:
            backgroundImage = "/sun.png"; 
            displayText = "Projects";
    }

    return (
        <div className="parallax" ref={ref}>
            <motion.h1 style={{ y: yText }}>
                {displayText}
            </motion.h1>
            <motion.div className="mountains"></motion.div>
            <motion.div 
                className="planets" 
                style={{ y: yBg, backgroundImage: `url(${backgroundImage})` }}
            ></motion.div>
            <motion.div style={{ x: yBg }} className="stars"></motion.div>
        </div>
    );
};

export default Parallax;
