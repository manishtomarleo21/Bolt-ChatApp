import { MessageSquare, Brain } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative">
      {/* AI Powered Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-base-content bg-primary/10 px-3 py-1 rounded-lg shadow-md">
        <Brain className="w-5 h-5" />
        <span className="text-sm font-semibold">AI Powered</span>
      </div>

      {/* Main Content */}
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-base-100 text-primary/10 flex items-center justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Bolt!</h2>
        <p className="text-base-content/60">
          Choose a conversation from the sidebar to get started
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;