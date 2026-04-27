import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">


      
      {/* LEFT SECTION */}
      <div className="home-left">
        <h1 className="logo">TalkHub</h1>
        <h1 className="title">
          Connect. Chat. <span>Instantly.</span>
        </h1>

        <p className="subtitle">
          A modern real-time chat app built for smooth conversations, fast messaging,
          and beautiful design.
        </p>

        <div className="btn-group">
          <Link to="/login" className="btn primary">Sign In</Link>
          <Link to="/signup" className="btn secondary">Create Account</Link>
        </div>
      </div>

      {/* RIGHT SECTION (PREVIEW CARD) */}
      <div className="home-right">
        <div className="preview-card">
          <div className="chat-bubble left">Hey 👋</div>
          <div className="chat-bubble right">Hello! How are you?</div>
          <div className="chat-bubble left">All good, this UI looks 🔥</div>
        </div>
      </div>

    </div>
  );
}