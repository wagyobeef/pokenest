import React from "react";

const ComingSoonPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#FFF9DB" }}
    >
      <h1 className="font-bold mb-4" style={{ fontSize: "5rem" }}>
        <span className="text-black">Poke</span>
        <span style={{ color: "#F28B82" }}>Nest</span>
      </h1>
      <h2 className="text-4xl text-gray-400">Coming Soon</h2>
    </div>
  );
};

export default ComingSoonPage;
