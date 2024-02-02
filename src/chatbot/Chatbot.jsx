import { useState } from 'react';
import './chatbot.scss';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userInput, setUserInput] = useState(''); // 新增状态来存储用户输入
    const [messages, setMessages] = useState([]); // 添加了这行来定义messages状态

    // 切换聊天窗口状态的函数
    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    // 更新用户输入的函数
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    // 处理发送消息的函数
    const handleSendMessage = () => {
        if (userInput.trim()) { // 确保输入不为空
            // 创建新消息对象
            const newMessage = {
                text: userInput,
                sender: 'user', // 假设所有消息都由用户发送
                // 可以添加更多属性，如时间戳、用户ID等
            };

            // 更新messages状态，包括新消息
            setMessages(messages => [...messages, newMessage]);

            console.log(userInput); // 打印用户输入（可选）
            setUserInput(''); // 清空输入框
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
                    <button id="chat-button" onClick={toggleChatWindow}>
                        💬 Chat with me
                    </button>
                )}

                {/* 铃铛按钮，始终显示，但图标根据聊天窗口是否打开而改变 */}
                <button
                    id="bell-button"
                    onClick={toggleChatWindow}
                    style={{
                        backgroundImage: `url(${isChatOpen ? '/message.png' : '/bell.png'})`
                    }}
                >
                </button>
            </div>

            {/* 聊天窗口 */}
            {isChatOpen && (
                <div id="chat-window">
                    <div id="chat-header">
                        <img src="portfolio_icon.png" alt="Avatar" id="chat-avatar" />
                        <h3>Hi there👋</h3>
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


                    <div id="chat-input-container">
                        <input
                            type="text"
                            id="chat-input"
                            value={userInput}
                            onChange={handleUserInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter your message..."
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
