import React, { useState, useRef } from 'react';

function ImageRecognition() {
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
        setDetectionMessage(data.message ? 'true' : 'false');
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
  );
}

export default ImageRecognition;

