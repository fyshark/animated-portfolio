import axios from 'axios'; // Import axios at the top of the file
import { useState, useEffect } from 'react';
import './chatbot.scss';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userInput, setUserInput] = useState(''); // Add state to store user input
    const [messages, setMessages] = useState([
        {
            text: "👋 Hi there, I'm Yu Bot! Ready to dive into Yu's tech world? Ask away about coding, data science, or any cool project insights. Let's spark some fun conversations! 🔥",
            sender: 'bot',
        }
    ]);
    const [userId, setUserId] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [shouldShake, setShouldShake] = useState(false);

    // Functions for switching the state of the chat window
    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Functions to update user input
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    useEffect(() => {
        // Generate or get an existing user ID
        let currentUserId = localStorage.getItem('userId');
        let sessionId = localStorage.getItem('sessionId');

        if (!currentUserId) {
            currentUserId = `user_${Date.now()}`;
            localStorage.setItem('userId', currentUserId);
        }

        if (!sessionId) {
            sessionId = `session_${Date.now()}`; // Or use more sophisticated UUID generation methods
            localStorage.setItem('sessionId', sessionId);
        }

        setUserId(currentUserId);
        setSessionId(sessionId);
    }, []);

    // Functions that handle sending messages
    const handleSendMessage = async () => {
        if (userInput.trim()) {
            const newMessage = {
                text: userInput,
                sender: 'user',
            };
            setMessages(messages => [...messages, newMessage]);

            try {
                // Send request to backend
                const response = await axios.post('https://server.yu-feng.me/generate-response', {
                    userId,
                    sessionId,
                    message: userInput, // Make sure the fields here match what the backend expects
                });

                // const response = await axios.post('http://localhost:3001/generate-response', {
                //     userId,
                //     sessionId,
                //     message: userInput, // Make sure the fields here match what the backend expects
                // });

                // Receive responses and update to the chat screen
                const botMessage = {
                    text: response.data.message,
                    sender: 'bot',
                };
                setMessages(messages => [...messages, botMessage]);
            } catch (error) {
                // Cases in which the number of issues handled has reached the limit
                if (error.response && error.response.status === 429) {
                    const limitMessage = {
                        text: error.response.data.message || "You've reached the question limit for this dialogue session.", // 使用后端返回的错误消息或默认消息
                        sender: 'bot',
                    };
                    setMessages(messages => [...messages, limitMessage]);
                } else {
                    console.error('Error sending message:', error);
                    // Other types of errors can be handled here
                }
            }

            setUserInput(''); // Clear the input box
        }else{
            // If the input is empty, the vibration effect is triggered
            setShouldShake(true);
            setTimeout(() => setShouldShake(false), 820); // Reset status after vibration time
            return; // No follow-on logic
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Check that the Enter key is pressed and the Shift key is not pressed.
            e.preventDefault(); // Blocking default behavior, such as inserting line breaks in input boxes
            handleSendMessage(); // Call the function that sends the message
        }
    };



    return (
        <div className="chatbot">
            {/* Chat button and bell button containers */}
            <div id="chat-button-container">
                {/* Show “Chat with me” button when the chat window is not open. */}
                {!isChatOpen && (
                    <>
                        <button id="chat-button" onClick={toggleChatWindow}>
                            💬 Chat with me
                        </button>

                        <button
                            id="bell-button"
                            onClick={toggleChatWindow}
                            style={{
                                // backgroundImage: `url(${isChatOpen ? '/message.png' : '/bell.png'})`,
                                backgroundImage: 'bell.png',
                                position: "absolute",
                                right: "10px"
                            }}
                        >
                        </button>

                    </>
                )}

                {/* Bell button, always displayed, but icon changes depending on whether the chat window is open or not */}

            </div>

            {/* chat window */}
            {isChatOpen && (
                <div id="chat-window">
                    <div id="chat-header">
                        <img src="portfolio_icon.png" alt="Avatar" id="chat-avatar" />
                        <h3>Yu Bot</h3>
                        <button onClick={toggleChatWindow} id="close-chat">⌄</button>
                    </div>
                    {/* The rest of the chat window */}
                    {/* Input dialog section */}
                    <div id="chat-content">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>


                    <div id="chat-input-container" className={shouldShake ? 'shake' : ''}>
                        <input
                            type="text"
                            id="chat-input"
                            value={userInput}
                            onChange={handleUserInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter your message..."
                            autoComplete="off"
                        />
                        <button onClick={handleSendMessage} id="send-message" title="Send">

                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
