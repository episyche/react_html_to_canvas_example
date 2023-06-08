import React, { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {

  const myRef = useRef(null);

  const handleConvertToImagell = () => {

    html2canvas(myRef.current, {
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight,
      backgroundColor: null, // set to null to use the div's background color
    }).then(canvas => {
      canvas.toBlob(blob => {
        blobToBase64(blob)
          .then(base64 => {
            console.error('base64', base64);
          })
          .catch(error => {
            console.error('error', error);
          });

        saveAs(blob, 'my-image.png'); // download the image as PNG with a filename of your choice
      }, "image/png", 1);
    });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        let base64data = reader.result;
        base64data = base64data.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div style={{ margin: 0, backgroundColor: '#9dca9d', height: '100vh' }} >
      <div style={{
        border: '1px solid #9dca9d', textAlign: 'center', fontSize: '20px', padding: 0, margin: 0
      }}>
        <p>React JS</p>
      </div>
      <div ref={myRef} style={{
        color: 'white', border: '1px solid gray', backgroundColor: 'gray',
        textAlign: 'center', fontSize: '20px', padding: 0, margin: 0
      }}>
        <p>html2canvas</p>
      </div>
      <div onClick={() => handleConvertToImagell()} style={{ width: 'fit-content', margin: '10px auto' }}>
        <button style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: 'black', color: 'white' }}>
          click
        </button>
      </div>
    </div>
  );
}
export default App;
