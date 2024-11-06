import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Welcome.css";

const Welcome = () => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsSignedIn(!!user); // Set true if user is signed in
        });
        
        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const handleSignInRedirect = () => {
        navigate("/signin");
    };
    


    return (
        <div>
            {/* Navbar */}
            <nav>
                <ul className="nav">
                <li><a href="/about">Spot view</a></li>
                        {isSignedIn && <li><a href= '/Live-view'>Live View</a></li>}
                        {isSignedIn && <li><a href="/Cars"> Cars</a></li>}
                        <li><a href="/home"> Home</a></li>
                </ul>
            </nav>
            
            {/* Section 1: Welcome Message */}
            <div className="section">
                <div className="welcome-container">
                    <h1>Welcome to Our Application</h1>
                    <p>
                        This application provides you with a convenient way to manage and reserve spots.
                        Please sign in to access all features, including real-time spot availability and 
                        the live camera feed.
                    </p>
                    <button className="signin-button" onClick={handleSignInRedirect}>
                        Go to Sign In
                    </button>
                </div>
            </div>

            {/* Section 2: Interactive Form Example */}
            <div className="section">
                <h2>Get to Know More About Us</h2>
                <form className="interactive-form">
                    <label htmlFor="email">Subscribe for Updates:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    <button type="submit">Subscribe</button>
                </form>
            </div>

            {/* Section 3: User Feedback */}
            <div className="section">
                <h2>Share Your Thoughts</h2>
                <form className="interactive-form">
                    <label htmlFor="feedback">Your Feedback:</label>
                    <textarea id="feedback" name="feedback" placeholder="Write your feedback here..." rows="4"></textarea>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>

            {/* Section 4: SVG and Image */}
            <div className="section">
                <div className="photo-container"></div>
                <svg width="400" height="120">
                    <rect x="10" y="10" width="200" height="100" stroke="red" strokeWidth="6" fill="black" />
                </svg>
            </div>
        </div>
    );
};

export default Welcome;
