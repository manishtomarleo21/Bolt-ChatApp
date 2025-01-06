import { useState } from 'react';
import { Send } from "lucide-react";

const AIinput = ({ setText, genAnswer }) => {
    const [inputText, setInputText] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Set the input text from the input field
        setText(inputText.trim());

        // Call the passed genAnswer function to generate the AI response
        await genAnswer(inputText.trim());

        // Clear the input field after sending
        setInputText('');
    };

    return (
        <div className="p-4 w-full">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!inputText.trim()}  // Disable button if input is empty
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default AIinput;