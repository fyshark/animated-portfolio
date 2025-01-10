import axios from 'axios'; // 在文件顶部导入axios
import { useState, useEffect } from 'react';
import './chatbot.scss';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userInput, setUserInput] = useState(''); // 新增状态来存储用户输入
    const [messages, setMessages] = useState([
        {
            text: "👋 Hi there, I'm Yu Bot! Ready to dive into Yu's tech world? Ask away about coding, data science, or any cool project insights. Let's spark some fun conversations! 🔥",
            sender: 'bot',
        }
    ]);
    const [userId, setUserId] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [shouldShake, setShouldShake] = useState(false);

    // 切换聊天窗口状态的函数
    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    // 更新用户输入的函数
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    useEffect(() => {
        // 生成或获取已存在的用户ID
        let currentUserId = localStorage.getItem('userId');
        let sessionId = localStorage.getItem('sessionId');

        if (!currentUserId) {
            currentUserId = `user_${Date.now()}`;
            localStorage.setItem('userId', currentUserId);
        }

        if (!sessionId) {
            sessionId = `session_${Date.now()}`; // 或使用更复杂的UUID生成方法
            localStorage.setItem('sessionId', sessionId);
        }

        setUserId(currentUserId);
        setSessionId(sessionId);
    }, []);

    // 处理发送消息的函数
    const handleSendMessage = async () => {
        if (userInput.trim()) {
            const newMessage = {
                text: userInput,
                sender: 'user',
            };
            setMessages(messages => [...messages, newMessage]);

            try {
                // 发送请求到后端
                const response = await axios.post('https://server.yu-feng.me/generate-response', {
                    userId,
                    sessionId,
                    message: userInput, // 确保这里的字段与后端期望的一致
                });

                // const response = await axios.post('http://localhost:3001/generate-response', {
                //     userId,
                //     sessionId,
                //     message: userInput, // 确保这里的字段与后端期望的一致
                // });

                // 接收回答并更新到聊天界面
                const botMessage = {
                    text: response.data.message,
                    sender: 'bot',
                };
                setMessages(messages => [...messages, botMessage]);
            } catch (error) {
                // 处理问题数量达到限制的情况
                if (error.response && error.response.status === 429) {
                    const limitMessage = {
                        text: error.response.data.message || "You've reached the question limit for this dialogue session.", // 使用后端返回的错误消息或默认消息
                        sender: 'bot',
                    };
                    setMessages(messages => [...messages, limitMessage]);
                } else {
                    console.error('Error sending message:', error);
                    // 可以在这里处理其他类型的错误
                }
            }

            setUserInput(''); // 清空输入框
        }else{
            // 如果输入为空，触发震动效果
            setShouldShake(true);
            setTimeout(() => setShouldShake(false), 820); // 震动时间后重置状态
            return; // 不执行后续逻辑
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // 检查是否按下了Enter键且没有按下Shift键
            e.preventDefault(); // 阻止默认行为，例如在输入框中插入换行
            handleSendMessage(); // 调用发送消息的函数
        }
    };



    return (
        <div className="chatbot">
            {/* 聊天按钮和铃铛按钮的容器 */}
            <div id="chat-button-container">
                {/* 当聊天窗口未打开时显示 "Chat with me" 按钮 */}
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

                {/* 铃铛按钮，始终显示，但图标根据聊天窗口是否打开而改变 */}

            </div>

            {/* 聊天窗口 */}
            {isChatOpen && (
                <div id="chat-window">
                    <div id="chat-header">
                        <img src="portfolio_icon.png" alt="Avatar" id="chat-avatar" />
                        <h3>Yu Bot</h3>
                        <button onClick={toggleChatWindow} id="close-chat">⌄</button>
                    </div>
                    {/* 聊天窗口的其他内容 */}
                    {/* 输入对话框部分 */}
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
