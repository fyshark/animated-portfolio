import './about.scss';

const About = () => {
  return (

    <div className="about">

      <div className="intro">
        <div className="about_section">
          <h2>Get to Know Me</h2>
          <hr />
          <p>👋 Hello! I'm Yu Feng, a technology enthusiast currently based in Berlin, Germany, with a Master's degree in Computer Science. My academic and professional journey has guided me into the exciting world of software development, where I specialize in crafting reliable and innovative solutions. My ambition is to leverage my skills in software development and data science to make meaningful contributions to the technology industry. Outside of work, I am passionate about photography and am excited to share my portfolio with you soon.</p>
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
              <div className="skills_skill">Java</div>
              <div className="skills_skill">Python</div>     
              <div className="skills_skill">Kafka</div>
              <div className="skills_skill">SQL</div>
              <div className="skills_skill">Git</div>
              <div className="skills_skill">CI/CD</div>
              <div className="skills_skill">AWS</div>        
              <div className="skills_skill">Docker</div>
              
            </div>
          </div>

          <div className="experience">
            <h2>My experience</h2>
            <hr />
            <p>Software Engineer Intern, Tenable Ireland&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;06.2024 -- 09.2024</p>
            <p>Msc. Computer Science, Univerisity College Dublin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09.2022 -- 01.2024</p>
            <p>Fraud Investigation Specialist, Amazon, Ireland&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;05.2021 -- 08.2022</p>
            <p>Msc. Pharmaceutical Science, Trinity College Dublin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09.2019 -- 12.2020</p>
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