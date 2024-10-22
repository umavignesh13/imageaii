import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faImages, 
  faPhone, 
  faQuestionCircle, 
  faWandMagicSparkles, 
  faHistory 
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 

const Layout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0');
  background-size: cover;
  background-position: center;
  padding: 0;
  margin: 0;
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: #1c1c1c;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
`;

const SidebarButton = styled(Link)` 
  background-color: #f7931e;
  color: #fff;
  text-decoration: none;
  border: none;
  padding: 12px 20px;
  margin: 10px 0;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #d87c1a;
  }

  svg {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  margin: 20px; /* Margin to give some space around content */
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 800px; /* Max width for the content area */
  text-align: center; /* Center text */
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem; /* Adjust font size */
  margin-bottom: 1rem;

  svg {
    margin-right: 10px;
  }
`;

const Input = styled.textarea`
  padding: 1rem;
  width: 100%; /* Full width of the content area */
  height: 120px;
  margin-bottom: 1rem;
  border: 2px solid #f7931e;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: ${({ bgColor }) => bgColor}; 
  color: #333;
  outline: none;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  &:focus {
    border-color: #d87c1a;
    box-shadow: 0 0 5px rgba(247, 147, 30, 0.5);
  }
`;

const Button = styled.button`
  background-color: #f7931e;
  color: white;
  border: none;
  padding: 0.9rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d87c1a;
  }

  svg {
    margin-right: 10px;
  }
`;

const Image = styled.img`
  margin-top: 2rem;
  max-width: 100%;
  height: auto;
  border-radius: 15px;
`;

const HistorySidebar = styled.div`
  width: 280px;
  background-color: #f7f7f7; 
  padding: 20px;
  overflow-y: auto;
  border-left: 3px solid #f7931e;
  border-radius: 0 15px 15px 0;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
`;

const HistoryTitle = styled.h3`
  color: #333;  
  font-size: 1.7rem;
  margin-bottom: 10px;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  svg {
    margin-right: 10px;
  }
`;

const HistoryImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const HistoryText = styled.p`
  color: black;  
  margin-bottom: 10px;
`;

const About = () => (
  <Content>
    <Title><FontAwesomeIcon icon={faInfoCircle} /> About Us</Title>
    <p style={{ color: '#555' }}>Welcome to the About Us page! We are dedicated to creating amazing AI-generated images based on your prompts.</p>
    <p style={{ color: '#555' }}>Our mission is to inspire creativity and innovation using cutting-edge technology.</p>
  </Content>
);

const Gallery = () => (
  <Content>
    <Title><FontAwesomeIcon icon={faImages} /> Gallery</Title>
    <p style={{ color: '#555' }}>Explore our gallery of AI-generated images! Each image tells a unique story based on the prompts provided by users.</p>
  </Content>
);

const Contact = () => (
  <Content>
    <Title><FontAwesomeIcon icon={faPhone} /> Contact Us</Title>
    <p style={{ color: '#555' }}>If you have any questions or feedback, feel free to reach out to us!</p>
    <p style={{ color: '#555' }}>Email: support@imaginaryapp.com</p>
    <p style={{ color: '#555' }}>Phone: +91 - 9876543242</p>
  </Content>
);

const FAQ = () => (
  <Content>
    <Title><FontAwesomeIcon icon={faQuestionCircle} /> FAQ</Title>
    <h4 style={{ color: '#555' }}>Q: How do I generate an image?</h4>
    <p style={{ color: '#555' }}>A: Simply enter a prompt and click "Generate Image".</p>
    <h4 style={{ color: '#555' }}>Q: What types of images can I generate?</h4>
    <p style={{ color: '#555' }}>A: You can generate any image based on the prompts you provide. Get creative!</p>
  </Content>
);

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');   
  const [imageUrl, setImageUrl] = useState('');   
  const [history, setHistory] = useState([]);     
  const [inputBgColor, setInputBgColor] = useState('#f7f7f7'); 

  const generateImage = async () => {
    if (!prompt) return;

    try {
      const newImageUrl = `https://api.generated.image/${prompt.replace(/\s/g, '-')}.png`;
      setImageUrl(newImageUrl);
      setHistory((prevHistory) => [...prevHistory, newImageUrl]);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleInputBgColorChange = (e) => {
    const input = e.target.value;
    setPrompt(input);
    if (input.length > 10) {
      setInputBgColor('#ffe5e5'); 
    } else {
      setInputBgColor('#f7f7f7'); 
    }
  };

  return (
    <Layout>
      <Sidebar>
        <SidebarButton to="/"><FontAwesomeIcon icon={faHome} /> Home</SidebarButton>
        <SidebarButton to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</SidebarButton>
        <SidebarButton to="/gallery"><FontAwesomeIcon icon={faImages} /> Gallery</SidebarButton>
        <SidebarButton to="/contact"><FontAwesomeIcon icon={faPhone} /> Contact</SidebarButton>
        <SidebarButton to="/faq"><FontAwesomeIcon icon={faQuestionCircle} /> FAQ</SidebarButton>
      </Sidebar>
      <Content>
        <Title><FontAwesomeIcon icon={faWandMagicSparkles} /> U imagine we create</Title>
        <Input
          type="text"
          value={prompt}
          placeholder="Enter your prompt"
          bgColor={inputBgColor}
          onChange={handleInputBgColorChange}
        />
        <Button onClick={generateImage}>
          <FontAwesomeIcon icon={faWandMagicSparkles} /> Generate Image
        </Button>
        {imageUrl && <Image src={imageUrl} alt="Generated" />}
      </Content>
      <HistorySidebar> 
        <HistoryTitle><FontAwesomeIcon icon={faHistory} /> Image History</HistoryTitle>
        {history.map((imgUrl, index) => (
          <div key={index}>
            <HistoryText><FontAwesomeIcon icon={faWandMagicSparkles} /> Generated Image {index + 1}</HistoryText>
            <HistoryImage src={imgUrl} alt={`Generated Image ${index + 1}`} /> {/* Fixed alt syntax */}
          </div>
        ))}
      </HistorySidebar>
    </Layout>
  );
};

  const App = () => (
    <Router basename="/New"> 
      <Routes>
        <Route path="/" element={<ImageGenerator />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
  

export default App;