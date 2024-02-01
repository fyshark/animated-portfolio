import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../Sidebar';

const variants = {
    open: {
        transition: { staggerChildren: 0.1 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    },
};

const Links = ({ onLinkClick }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    const items = [
        { name: "Homepage", path: "/#Homepage" },
        { name: "About", path: "/#About" },
        { name: "Content", path: isMobile ? "/#ContentSection" : "/#Content" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Project", path: isMobile ? "/#case-study-1" : "/#Project" },
        { name: "Contact", path: "/#Contact" },
    ];

    return (
        <motion.div className="links" variants={variants}>
            {items.map((item) => (
                <Link to={item.path} key={item.name} onClick={onLinkClick}>
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            // setOpen = !setOpen
                        }}
                    >
                        {item.name}
                    </motion.div>
                </Link>
            ))}
        </motion.div>
    );
};

export default Links;
