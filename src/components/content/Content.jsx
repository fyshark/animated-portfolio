import "./content.scss"
import { SiScikitlearn } from "react-icons/si";
import { FaReact, FaJava, FaDocker, FaPython } from "react-icons/fa6";
import { BiLogoPostgresql, BiLogoMongodb, BiLogoKubernetes } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { motion, useInView } from "framer-motion"
import React, { useRef } from 'react';

const variants = {
    initial: {
        x: -500,
        y: 100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    },
};

const Content = () => {

    const ref = useRef()

    return (
        <motion.div
            className="content"
            variants={variants}
            initial="initial"
            //   animate="animate"
            // whileInView="animate"
            ref={ref}
            animate={"animate"}
        >
            <motion.div className="textContainer" variants={variants}>
                <p>These are my projects.
                    <br />Let's take a look
                </p>
                <hr />
            </motion.div>
            <motion.div className="titleContainer" variants={variants}>
                <div className="title">
                    <img src="/bulb.png" alt="" />
                    <h1>
                        <motion.b whileHover={{ color: "#efc838" }}>Unique</motion.b> Ideas
                    </h1>
                </div>
                <div className="title">
                    <h1>
                        <motion.b whileHover={{ color: "#efc838" }}>Featured</motion.b> Works.
                    </h1>
                    <a href="#Project">
                        <button>WHAT I DO?</button>
                    </a>
                </div>

            </motion.div>
            <motion.div className="listContainer" variants={variants}>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "#222825" }} >
                    <h2>AutoMate</h2>
                    <p>AutoMate, our intuitive app designed for Manhattan drivers, uses advanced machine learning to predict congestion and parking availability,
                        enhancing navigation and parking experiences.
                    </p>
                    <div className="icons-container">
                        <FaReact className="icon" title="React"/>
                        <FaJava className="icon" title="Java"/>
                        <BiLogoPostgresql className="icon" title="Postgresql"/>
                        <FaDocker className="icon" title="Docker"/>
                        <FaPython className="icon" title="Python"/>
                    </div>
                    <a href="#case-study-1">
                        <button><b>Case Study</b></button>
                    </a>
                </motion.div>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "#222825" }}>
                    <h2>Foodies</h2>
                    <p>Foodies, a distributed food delivery system using Akka Actors,
                        features five core services and a real-time dashboard powered by SSE for
                        live system updates and seamless order processing.
                    </p>

                    <div className="icons-container">
                        <FaReact className="icon" title="React"/>
                        <FaJava className="icon" title="Java"/>
                        <BiLogoMongodb className="icon" title="Mongodb"/>
                        <FaDocker className="icon" title="Docker"/>
                        <BiLogoKubernetes className="icon" title="Kubernetes"/>
                    </div>

                    <a href="#case-study-2">
                        <button><b>Case Study</b></button>
                    </a>
                </motion.div>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "#222825" }}>
                    <h2>Fatigue Detection</h2>
                    <p>This project aims to create models that use accelerometer sensor data
                        to distinguish between fatigued and non-fatigued running, analyzing
                        labeled stride data from two subjects to detect runner fatigue.
                    </p>
                    <div className="icons-container">
                        {/* <img src="/machine-learning.png" alt="machine-learning" title="React" /> */}
                        <SiScikitlearn className="icon" title="Scikit" />
                        <FaPython className="icon" title="Python"/>
                    </div>
                    <a href="#case-study-3">
                        <button><b>Case Study</b></button>
                    </a>
                </motion.div>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "#222825" }}>
                    <h2>Asteroids Game</h2>
                    <p>Explore the classic arcade game with my JavaFX rendition of 'Asteroids' on my website.
                        Navigate through space, destroy asteroids, and evade alien ships in this game,
                        showcasing the power of JavaFX in bringing retro gaming to life.
                    </p>
                    <div className="icons-container">
                        <FaJava className="icon" title="Java"/>
                        <FaGithub className="icon" title="Github"/>
                    </div>
                    <a href="#case-study-4">
                        <button><b>Case Study</b></button>
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Content