import { useEffect } from 'react';
import './portfolio.scss';
import { Link } from 'react-router-dom';



const Portfolio = () => {

    return (
        <div className="portfolio">
            <nav className="navigation">
                <button><a href="/">Home</a></button>
                <div className="dropdown">
                    <button className="dropbtn">Collection</button>
                    <div className="dropdown-content">
                        <a href="/portfolio#street">Street</a>
                        <a href="/portfolio#landscape">Landscape</a>
                        <a href="/portfolio#portrait">Portrait</a>
                    </div>
                </div>
                <button>
                    <Link to="/#About">About</Link>
                </button>
                <button><a href="/#Contact">Contact</a></button>
            </nav>

            <div className="collection-display" id="street">
                <h2>STREET Collection</h2>
                <div className="street-gallery">
                    <div className="img-container">
                        <img src="/street2.png" loading="lazy" alt="Street View 2" />
                        <img src="/street4.png" loading="lazy" alt="Street View 4" />
                        <img src="/street7.png" loading="lazy" alt="Street View 7" />
                    </div>
                    <div className="img-container">
                        <img src="/street3.png" loading="lazy" alt="Street View 3" />
                        <img src="/street5.png" loading="lazy" alt="Street View 5" />
                        <img src="/street8.png" loading="lazy" alt="Street View 8" />
                    </div>
                    <div className="img-container">
                        <img src="/street1.png" loading="lazy" alt="Street View 1" />
                        <img src="/street6.png" loading="lazy" alt="Street View 6" />
                        <img src="/street9.png" loading="lazy" alt="Street View 9" />
                    </div>
                </div>
            </div>

            <div className="collection-display" id="landscape">
                <h2>LANDSCAPE Collection</h2>
                <div className="landscape-gallery">
                    <div className="img-container">
                        <img src="/landscape1.png" loading="lazy" alt="Landscape View 1" />
                        <img src="/landscape4.png" loading="lazy" alt="Landscape View 4" />
                        <img src="/landscape5.png" loading="lazy" alt="Landscape View 5" />
                    </div>
                    <div className="img-container">
                        <img src="/landscape2.png" loading="lazy" alt="Landscape View 2" />
                        <img src="/landscape6.png" loading="lazy" alt="Landscape View 6" />
                        <img src="/landscape7.png" loading="lazy" alt="Landscape View 7" />
                    </div>
                    <div className="img-container">
                        <img src="/landscape3.png" loading="lazy" alt="Landscape View 3" />
                        <img src="/landscape8.png" loading="lazy" alt="Landscape View 8" />
                        <img src="/landscape9.png" loading="lazy" alt="Landscape View 9" />
                    </div>
                </div>
            </div>

            <div className="collection-display" id="portrait">
                <h2>PORTRAIT Collection</h2>
                <div className="Portrait-gallery">
                    <div className="img-container">
                        <img src="portrait1.png" loading="lazy" alt="Portrait View 1" />
                        <img src="portrait6.png" loading="lazy" alt="Portrait View 6" />
                        <img src="portrait8.png" loading="lazy" alt="Portrait View 8" />

                    </div>
                    <div className="img-container">
                        <img src="portrait2.png" loading="lazy" alt="Portrait View 2" />
                        <img src="portrait4.png" loading="lazy" alt="Portrait View 4" />
                        <img src="portrait5.png" loading="lazy" alt="Portrait View 5" />

                    </div>
                    <div className="img-container">
                        <img src="portrait3.png" loading="lazy" alt="Portrait View 3" />
                        <img src="portrait7.png" loading="lazy" alt="Portrait View 7" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
