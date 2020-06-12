import React from 'react';

interface WelcomeProps {
    name: string;
}

const Welcome: React.FC<WelcomeProps> = ({ name }) => (
  <h1>Hello, {name}</h1>
);

export default Welcome;
