import React, { useState } from 'react';
import axios from 'axios';
import { Bot, Loader2 } from 'lucide-react';  // Import Loader2 for the loading spinner
import AIinput from './AIinput.jsx';
import { formatMessageTime } from '../lib/utils.js';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const AIChat = () => {
    const [text, setText] = useState('');  // State to hold the text input from AIinput
    const [answer, setAnswer] = useState('');  // State to hold the generated answer
    const [loading, setLoading] = useState(false);  // State to track if the request is loading

    // Function to generate the answer
    async function genAnswer(userText) {
        if (!userText.trim()) return;

        console.log('loading...');
        setLoading(true);  // Set loading state to true when the API request starts

        try {
            const res = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                method: 'POST',
                data: {
                    contents: [
                        { parts: [{ text: userText }] },  // Pass the user input text in the request
                    ],
                },
            });

            setAnswer(res.data.candidates[0].content.parts[0].text);  // Set the response text
            console.log(res.data.candidates[0].content.parts[0].text);  // Log the response text
        } catch (error) {
            console.error('Error generating answer:', error);
        } finally {
            setLoading(false);  // Set loading state to false after the API request is completed (either success or failure)
        }
    }

    return (
        <div className="w-full flex flex-1 flex-col items-center justify-between p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
                        justify-center animate-bounce"
                        >
                            <Bot className="w-8 h-8 text-primary " />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>

            {/* Display loading spinner or answer */}
            {loading ? (
                <div className="chat-message flex flex-col gap-2">
                    {/* Chat Header with Time */}
                    <div className="chat-header flex justify-between items-center mb-1">
                        <div className="flex-grow"></div> {/* Spacer to push time to the right */}
                        <time className="text-xs opacity-50">
                            {formatMessageTime(new Date())}
                        </time>
                    </div>

                    {/* Loading Spinner */}
                    <div className="chat-bubble flex justify-center items-center">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                </div>
            ) : (
                answer && (
                    <div className="chat-message flex flex-col gap-2">
                        {/* Chat Header with Time */}
                        <div className="chat-header flex justify-between items-center mb-1">
                            <div className="flex-grow"></div> {/* Spacer to push time to the right */}
                            <time className="text-xs opacity-50">
                                {formatMessageTime(new Date())}
                            </time>
                        </div>

                        {/* Answer */}
                        <div className="chat-bubble flex flex-col">
                            <pre className='whitespace-pre-wrap'>{answer}</pre>  {/* Render the answer only if it exists */}
                        </div>
                    </div>
                )
            )}

            {/* AIinput at the bottom */}
            <AIinput setText={setText} genAnswer={genAnswer} />  {/* Pass both setText and genAnswer to AIinput */}
        </div>
    );
};

export default AIChat;