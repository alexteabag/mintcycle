import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

export const DetectBottleView = () => {

  const [capturedBlob, setCapturedBlob] = useState(null);
  const [detectionMessage, setDetectionMessage] = useState(null);
  const capturedImageRef = useRef(null);
  const videoRef = useRef(null);
  let mediaStream = null;

  const startCamera = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      const video = videoRef.current;
      video.srcObject = mediaStream;
    } catch (error) {
      console.error('Error starting the camera:', error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    const video = videoRef.current;
    video.srcObject = null;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 320; // Set canvas width to 320 pixels
    canvas.height = 240; // Set canvas height to 240 pixels
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const captured = canvas.toDataURL('image/jpeg');
    const blob = dataURLtoBlob(captured);
    setCapturedBlob(blob);
    capturedImageRef.current.src = URL.createObjectURL(blob);
  };

  const uploadPhoto = async () => {
    if (!capturedBlob) {
      alert('Please capture an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', capturedBlob, 'img.jpg');

    try {
      const response = await fetch('http://127.0.0.1:8000/recognize', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        // Results of bottle detection
        setDetectionMessage(data.message ? 'Bottle detected!' : 'No bottle detected');

        // Update total recycled items Count
        if (data.message) {
          // Get previous Count from localStorage
          let recycledItemsCount = localStorage.getItem("recycledItemsCount");
          // Update new Count to localStorage
          let newCount = +recycledItemsCount + 1;
          localStorage.setItem("recycledItemsCount", newCount);
        }

      } else {
        setDetectionMessage('Error detecting plastic bottle.');
      }
    } catch (error) {
      console.error('Error:', error);
      setDetectionMessage('Error detecting plastic bottle.');
    }
  };

  // Function to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };


  return (

    <div>

      {/* Direct to another page */}
      <div class={styles.backSymbol}>
        <a href="/">
          &larr;
        </a>
      </div>

      <div className="App">

        <h1>Plastic Bottle Recognition</h1>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
        <video id="video" width="320" height="240" autoPlay ref={videoRef}></video>
        <button onClick={capturePhoto}>Capture Photo</button>

        <img
          ref={capturedImageRef}
          alt="Captured"
          style={{ display: 'block', maxWidth: '100%' }}
        />

        <button onClick={uploadPhoto}>Upload Photo</button>

        <p>{detectionMessage}</p>

      </div>


      {/* Direct to another page */}
      <div class={styles.forwardSymbol}>
        <a href="/page3">
          &rarr;
        </a>
      </div>

    </div>
  );
}
