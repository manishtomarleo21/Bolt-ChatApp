import { Brain } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative">
      {/* AI Powered Badge */}
      <div className="absolute left-[-5rem] flex items-center gap-2 text-base-content bg-transparent px-3 py-1 rounded-lg shadow-md">
        <Brain className="w-5 h-5" />
        <span className="text-m font-semibold">AI Powered</span>
      </div>

      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;