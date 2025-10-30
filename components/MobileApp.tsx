import React from 'react';

const MobileApp: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#111',
            color: 'white',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1>AutoJailbreak</h1>
            <p style={{ color: '#aaa' }}>
                The mobile version of this application is currently under development.
            </p>
            <p style={{ marginTop: '20px', color: '#888' }}>
                Please use a desktop browser for the full experience.
            </p>
        </div>
    );
};

export default MobileApp;
