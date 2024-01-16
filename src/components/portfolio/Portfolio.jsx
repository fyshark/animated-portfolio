import "./portfolio.scss"
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from 'react';

const items = [
    {
        id: 1,
        title: "Dublin street",
        img: "https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "The internet's source for visuals. Powered by creators everywhere."
    },
    {
        id: 2,
        title: "Galway street",
        img: "https://media.istockphoto.com/id/531926638/photo/across-galway-harbour-ireland.jpg?s=2048x2048&w=is&k=20&c=y9nCsPdnYQ8ICHz8JDCjlucU9-va2yc4sv5-AQ5ESIg=",
        desc: "The internet's source for visuals. Powered by creators everywhere."
    },
    {
        id: 3,
        title: "Cork street",
        img: "https://media.gettyimages.com/id/1436192145/photo/ireland-county-cork-cobh-colorful-row-houses-standing-along-steep-street-with-saint-colmans.jpg?s=2048x2048&w=gi&k=20&c=HD5GUV2IYSGe7cZOmYxiVLW7vvMc_KRsayzsMwnh0jY=",
        desc: "The internet's source for visuals. Powered by creators everywhere."
    },
    {
        id: 4,
        title: "Limerick street",
        img: "https://media.istockphoto.com/id/1407173048/photo/a-modern-city-street-with-ruins-of-a-medieval-house-in-limerick-ireland.jpg?s=612x612&w=0&k=20&c=sLwLk5T8riqsUUzb3k4YdzfaAwv_ePIv050DqVt7qVE=",
        desc: "The internet's source for visuals. Powered by creators everywhere."
    },
];

const Single = ({ item }) => {

    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
        // offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    return (
        <section>
            <div className="container">
                <div className="wrapper">
                    <div className="imageContainer" ref={ref}>
                        <img src={item.img} alt="" />
                    </div>
                    <motion.div className="textContainer" style={{ y }}>
                        <h2>{item.title}</h2>
                        <p>{item.desc}</p>
                        <button>See Demo</button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
};

const Portfolio = () => {
    const ref = useRef();


    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    return (
        <div className="portfolio" ref={ref}>
            <div className="progress">
                <h1>Featured Works</h1>
                <motion.div style={{ scaleX }} className="progressBar"></motion.div>
            </div>
            {items.map((item) => (
                <Single item={item} key={item.id} />
            ))}
        </div>
    );
};

export default Portfolio;