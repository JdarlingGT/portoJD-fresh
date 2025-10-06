import React from 'react';

const Gallery: React.FC = () => {
  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <p className="text-gray-500 mb-4">Explore our curated collection of images showcasing our latest projects and designs. Each image tells a story of creativity and innovation.</p>
      <div className='lr_embed' style={{ position: 'relative', paddingBottom: '50%', height: 0, overflow: 'hidden' }}>
        <p className="text-sm text-center text-gray-400 mt-2">Hover over the images for more details.</p>
        <iframe
          id='iframe'
          src='https://lightroom.adobe.com/embed/shares/b1f8050aa3ac452baae9e3590e1c92c8/slideshow?background_color=%232D2D2D&color=%23999999'
          frameBorder='0'
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        ></iframe>
      </div>
      <div className="video-gallery mt-8">
        <h2 className="text-2xl font-bold mb-4">Video Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/K6kco8-OZO0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/B67k_ybXjMk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Qg1qPvO23bw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/4cFQu1b_HZY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/RfkVYOZR1Ao"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/2qKhmvxeUg4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/CGUT9tQvj7Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Gallery;