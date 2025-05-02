import AppRouter from "./AppRouter";
import ComingSoonPage from "./ComingSoonPage/ComingSoonPage";

function App() {
  const showComingSoon = import.meta.env.VITE_SHOW_COMING_SOON === "true";

  if (showComingSoon) {
    return <ComingSoonPage />;
  }

  return <AppRouter />;
}

export default App;
