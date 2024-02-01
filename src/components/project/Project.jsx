import "./project.scss"
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from 'react';

const items = [
    {
        id: 1,
        title: "AutoMate Application Overview",
        img: "/automate1.gif",
        desc: "AutoMate is an innovative application crafted to streamline interactions with urban transportation amenities. Central to its design is a thoughtfully chosen technology stack and modern functionalities aimed at simplifying the process of locating and utilizing parking, charging, and fuel stations in urban settings, with a particular focus on Manhattan. This user-centric approach ensures an enhanced experience in urban mobility.",
        sourceCodeLink: "https://github.com/fyshark/AutoMateBusyness-NYC",
        liveLink: "http://137.43.49.42/",
        table: [
            { tech: "React", feature: "Ensures an interactive user interface." },
            { tech: "Java & Spring", feature: "Offers robust functionality and scalability." },
            { tech: "PostgreSQL", feature: "Guarantees reliable data management." },
            { tech: "Maven", feature: "Streamlines development and builds." },
            { tech: "Docker", feature: "Ensures easy and consistent application distribution." },
            { tech: "Python", feature: "Utilizes models like linear regression and XGBoost for real-time predictions." },
            { tech: "GitHub", feature: "Maintains code quality and integration." }
        ]
    },
    {
        id: 2,
        title: "Food Delivery Distributed System Overview",
        img: "/foodies1.gif",
        desc: "This project showcases a state-of-the-art food delivery system that has been professionally designed as a distributed system containing a series of microservices, each catering to a specific aspect of the food ordering and delivery process. The system consists of five main microservices: User, Restaurant, Order, Payment and Delivery, all of which interact together to facilitate a seamless user experience.",
        sourceCodeLink: "https://github.com/fyshark/foodies",
        table: [
            { tech: "Akka", feature: "Ensures efficient, concurrent operations in a distributed environment, ensuring resilience and scalability." },
            { tech: "React", feature: "Drives the dynamic and responsive user interface for real-time dashboards." },
            { tech: "SSE", feature: "Enables real-time data streaming between the Spring Boot backend and React frontend." },
            { tech: "MongoDB", feature: "Offers a scalable, flexible database solution, handling the high concurrency and complex queries." },
            { tech: "Docker", feature: "Utilized for containerizing each service, ensuring isolated, scalable, and efficient deployment." },
            { tech: "Kubernetes", feature: "Automates deployment and scaling of containers, ensuring system robustness and uptime." },
            { tech: "GitHub", feature: "Maintains code quality and integration." }
        ]
    },
    {
        id: 3,
        title: "Fatigue Detection in ML Overview",
        img: "/fatigue1.gif",
        desc: "This project explores advanced machine learning techniques for classifying time series data from accelerometer sensors, focusing on distinguishing between fatigued and non-fatigued running states. The dataset comprises segmented strides from two subjects (A and B), labeled as Fatigued (F) and Not Fatigued (NF).",
        sourceCodeLink: "https://github.com/fyshark/machine_learning_projects/tree/main/Time%20Series%20Running%20Data%20classification",
        table: [
            { task: "Baseline Model", details: "Initiated with a logistic regression classifier (SGDClassifier) on raw data for Subject A, achieving a baseline accuracy of 76.73%." },
            { task: "Enhancement with ROCKET Transformation", details: "Offers robust functionality and scalability." },
            { task: "Classifier Varieties", details: "Explored various classifiers including KNN, SVM, Decision Tree, Random Forest, Naive Bayes, Ridge Classifier, and updated SGDClassifier. Data normalization was applied to optimize performance." },
            { task: "Evaluation and Comparison", details: "The models were evaluated for their ability to classify fatigue in running, with SVM and Random Forest demonstrating superior performance. Naive Bayes and Decision Tree were less effective, indicating a preference for complex models in capturing intricate data patterns." },
            { task: "Generalizability Check with Subject B", details: "Tested conclusions from Subject A on Subject B's data, revealing insights into model adaptability and the effectiveness of personalized vs. global models." }
        ]
    },
    {
        id: 4,
        title: "Asteroids Game in JavaFX Overview",
        img: "/Asteroids1.gif",
        desc: "The Asteroids Game project is a modern reinterpretation of the classic arcade game, developed using JavaFX. This project not only replicates the original game's excitement but also enhances it with updated graphics and smooth gameplay mechanics. The game involves navigating a spaceship through an asteroid-laden space, destroying asteroids of varying sizes, and occasionally engaging with enemy alien ships.",
        sourceCodeLink: "https://github.com/fyshark/AsteroidJava",
        table: [
            { task: "Advanced Gameplay", details: "Upgraded the classic Asteroids game with JavaFX, introducing varied asteroid sizes with unique behaviors and splitting mechanics." },
            { task: "Enhanced Controls", details: "Integrated comprehensive spaceship controls with realistic momentum physics for strategic maneuvering." },
            { task: "Alien Challenges", details: "Added sporadic alien ship encounters, increasing the game's complexity and engagement." },
            { task: "Level Progression", details: "Implemented progressively challenging levels, increasing in asteroid quantity and speed." },
            { task: "Immersive Interface", details: "Developed a visually appealing interface with JavaFX, featuring an on-screen HUD for vital game statistics." },
            { task: "Fair Respawn", details: "Included a safe respawn system with temporary invincibility or strategic placement post-destruction." }
        ]
    },
];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const checkIfMobile = () => setIsMobile(mediaQuery.matches);
  
      mediaQuery.addListener(checkIfMobile);
      checkIfMobile();
  
      return () => mediaQuery.removeListener(checkIfMobile);
    }, []);
  
    return isMobile;
  };
  


const Single = ({ item }) => {

    const ref = useRef();

    const isMobile = useIsMobile();

    const [showTable, setShowTable] = useState(false); // State to toggle table visibility

    // Function to toggle the state
    const toggleTable = () => {
        setShowTable(prevShowTable => !prevShowTable);
    };


    const { scrollYProgress } = useScroll({
        target: ref,
        //offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);



    return (
        <section id={"case-study-" + item.id}>
            <div className="container">
                <div className="wrapper">
                    <div className={`imageContainer container-${item.id}`} ref={ref}>
                        <div className="laptop-frame">
                            <div className="video-resizer">
                                <img src={item.img} alt="" id="project-gif" />
                            </div>
                            <img src={"laptop.png"} alt="laptop-frame" id="laptop-img" />
                        </div>
                    </div>
                    <motion.div className="textContainer" style={{ y }}>
                        <h2>
                            {item.id === 1 && (
                                <>
                                    <motion.span whileHover={{ color: "#efc838" }}>AutoMate</motion.span>
                                    {" Application Overview"}
                                </>
                            )}
                            {item.id === 2 && (
                                <>
                                    <motion.span whileHover={{ color: "#efc838" }}>Food Delivery</motion.span>
                                    {" Distributed System Overview"}
                                </>
                            )}
                            {item.id === 3 && (
                                <>
                                    <motion.span whileHover={{ color: "#efc838" }}>Fatigue Detection</motion.span>
                                    {" in ML Overview"}
                                </>
                            )}
                            {item.id === 4 && (
                                <>
                                    <motion.span whileHover={{ color: "#efc838" }}>Asteroids Game</motion.span>
                                    {" in JavaFX Overview"}
                                </>
                            )}
                        </h2>
                        <p>{item.desc}</p>


                        <div className="buttons">
                            <a href={item.sourceCodeLink} target="_blank" rel="noopener noreferrer">
                                <button><b>Source Code ↗</b></button>
                            </a>

                            {item.liveLink && (
                                <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
                                    <button id="livelink"><b>See Live ↗</b></button>
                                </a>
                            )}

                            {!(isMobile && item.id === 1) && (
                                <button onClick={toggleTable}>
                                    <b>{showTable ? 'Show Less' : 'Read More'}</b>
                                </button>
                            )}
                        </div>

                        {showTable && item.table && (
                            <table>
                                <tbody>
                                    {item.table.map((row, index) => (
                                        <tr key={index}>
                                            {row.tech && row.feature ? (
                                                <>
                                                    <td><strong>{row.tech}</strong></td>
                                                    <td>{row.feature}</td>
                                                </>
                                            ) : row.task && row.details ? (
                                                <>
                                                    <td><strong>{row.task}</strong></td>
                                                    <td>{row.details}</td>
                                                </>
                                            ) : null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </motion.div>
                </div>
            </div>
        </section>
    )
};

const Project = () => {
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
        <div className="project" ref={ref}>
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

export default Project;