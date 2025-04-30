import { useEffect, useState } from "react";
import { SignInButton } from "@clerk/clerk-react";
import Button from "../components/Button";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div
        className={`text-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Poke<span className="text-[#F28B82]">Nest</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          For those who care deeply about cardboard
        </p>
        <div className="w-[800px] h-96 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 mx-auto">
          placeholder image
        </div>
        <SignInButton mode="modal">
          <Button variant="primary" size="large">
            Sign-in
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LandingPage;
