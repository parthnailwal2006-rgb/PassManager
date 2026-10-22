
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './FlipCard.css';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="auth-scene">
      <div
        className={`auth-card-inner ${
          isFlipped ? 'is-flipped' : ''
        }`}
      >
        <div className="auth-face auth-front">
          <Login
            onRegister={() => setIsFlipped(true)}
          />
        </div>

        <div className="auth-face auth-back">
          <Register
            onLogin={() => setIsFlipped(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
