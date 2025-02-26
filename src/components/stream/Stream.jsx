import React from 'react';

const Stream = ({ movieId }) => {
  const streamUrl = `https://vidsrc.dev/embed/movie/${movieId}`;

  return (
    <div className="stream-container">
      <iframe
        src={streamUrl}
        title="Movie Stream"
        allowFullScreen
        style={{ 
          width: '56.25vw', 
          height: '56.25vw', 
          maxHeight: '500px',
          border: 'none' 
        }}
      />
    </div>
  );
};

export default Stream;
