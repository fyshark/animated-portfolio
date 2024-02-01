import './about.scss';

const About = () => {
  return (

    <div className="about">

      <div className="intro">
        <div className="about_section">
          <h2>Get to Know Me</h2>
          <hr />
          <p>👋 Hello! I'm Yu Feng, a dedicated technology enthusiast with dual master's degrees in Computer Science and pharmaceutical science. My academic journey led me to the thrilling world of software development, a field I deeply enjoy and am eager to share with you. My ambition is to integrate my skills in software development and data science to make impactful contributions to both the technology and healthcare industries. Besides my tech pursuits, I am also fervently passionate about photography and am looking forward to unveiling my portfolio soon.</p>
          <br />
          <p id="welcome"><b>Welcome to my digital abode!</b></p>
          <a href="#Contact">
            <button>Contact</button>
          </a>
          <a href="https://drive.google.com/drive/folders/1PMmsOyX3qCmR4Deb68oz5TbMv0IgqdfT?usp=sharing" target='_blank'>
            <button>Resume</button>
          </a>
        </div>
      </div>
      <div className="skills_and_image">
        <div className="skills_and_image_left">
          <div className="skills">
            <h2>My Skills</h2>
            <hr />
            <div className="skills_container">
              <div className="skills_skill">Python</div>
              <div className="skills_skill">Java</div>     
              <div className="skills_skill">React JS</div>
              <div className="skills_skill">HTML/CSS</div>
              <div className="skills_skill">MySQL</div>
              <div className="skills_skill">MongoDB</div>
              <div className="skills_skill">Docker</div>        
              
            </div>
          </div>

          <div className="experience">
            <h2>My experience</h2>
            <hr />
            <p>Msc. Pharmaceutical Science, Trinity College Dublin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09.2019 -- 12.2020</p>
            <p>Fraud Investigation Specialist, Amazon, Ireland&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;05.2021 -- 08.2022</p>
            <p>Msc. Computer Science, Univerisity College Dublin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09.2022 -- 01.2024</p>
          </div>
        </div>
        <div className="skills_and_image_right">
          <img src="profile1.png" alt="my profile" className="skills_image" />
        </div>
      </div>
    </div>
   ); 
} 
 
export default About