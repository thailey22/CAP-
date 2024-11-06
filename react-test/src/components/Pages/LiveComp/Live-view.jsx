import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const CameraFeed = () => {
  const [feedUrl, setFeedUrl] = useState('https://www.cameraftp.com/cameraftp/publish/camera.aspx/parentID91431007/shareID13185814/modelive/nameParking/camTypeCamera');
  const [hasError, setHasError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'Spots');

    });

    setHasError(false);
  }, [feedUrl]);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
        <header>
                    <nav className='nav-container'>
                         <div className='nav-div'>Hello {currentUser.email ? currentUser.email : currentUser.email}, you are now logged in.</div>
                         <ul>
                             <li><a href="/about">Spot view</a></li>
                             <li><a href= '/Live-view'>Live View</a></li>
                             <li><a href="/Cars"> Cars</a></li>
                             <li><a href="/"> Home</a></li>
                         </ul>
                     </nav>
             </header>
      {hasError ? (
        <div style={{ color: 'red', textAlign: 'center' }}>
          <p>Failed to load camera feed. Please try again later.</p>
        </div>
      ) : (
        <iframe
          src={feedUrl}
          title="Live Camera Feed"
          width="100%"
          height="700px"
          allow="fullscreen"
          frameBorder="0"
          onError={handleError}
          style={{ maxWidth: '1000px', width: '900px', borderRadius: '8px', border: '2px solid #ccc' }}
        />
      )}
    </div>
  );
};

export default CameraFeed;


// const CameraFeed = () => {
// const { currentUser } = useAuth();
//   const videoRef = useRef(null);
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         setHasError(true);
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div>
//          <header>
//                     <nav className='nav-container'>
//                         <div className='nav-div'>Hello {currentUser.email ? currentUser.email : currentUser.email}, you are now logged in.</div>
//                         <ul>
//                             <li><a href="/about">Spot view</a></li>
//                             <li><a href= '/Live-view'>Live View</a></li>
//                             <li><a href="/Cars"> Cars</a></li>
//                             <li><a href="/"> Home</a></li>
//                         </ul>
//                     </nav>
//             </header>
//      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
//          {hasError ? (
//          <div style={{ color: 'red', textAlign: 'center' }}>
//               <p>Failed to access camera. Please check your permissions.</p>
//         </div>
//       ) : (
//          <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//              style={{ maxWidth: '1000px', width: '100%', borderRadius: '8px', border: '2px solid #ccc' }}
//          />
//         )}
//      </div>
//     </div>
//   );
// };

// export default CameraFeed;
