import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    aiMessages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    getAIMessages: async () => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get("/messages/ai");
            set({ aiMessages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { messages, selectedUser, aiMessages } = get();

        if (selectedUser._id === "AI_CHATBOT") {
            // Send message to AI service
            try {
                const res = await axiosInstance.post("/ai/chat", { message: messageData.text });
                const aiResponse = res.data.response;
                console.log(aiResponse);
                

                // Add both the sent message and AI response to the aiMessages state
                set({
                    aiMessages: [
                        ...aiMessages,
                        { senderId: "AI_CHATBOT", text: messageData.text, createdAt: new Date() },
                        { senderId: "AI_CHATBOT", text: aiResponse, createdAt: new Date() },
                    ]
                });
            } catch (error) {
                toast.error("AI chat service error");
            }
        } else {
            // Send message to the selected user
            try {
                const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
                set({ messages: [...messages, res.data] });
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            if (selectedUser._id === "AI_CHATBOT") {
                set({ aiMessages: [...get().aiMessages, newMessage] });
            } else {
                set({ messages: [...get().messages, newMessage] });
            }
        });
    },

    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));