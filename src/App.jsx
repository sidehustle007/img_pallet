import React, { useState } from "react";
import "./App.css";
import { ColorExtractor } from "react-color-extractor";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgColors, setImgColors] = useState();
  const [rgbtf, setRgbTF] = useState(false);
  const [cr, setR] = useState(0);
  const [cg, setG] = useState(0);
  const [cb, setB] = useState(0);
  console.log(imgColors);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);
    }
  };

  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // return {r, g, b} // return an object
    return `${r}, ${g}, ${b}`;
  };

  function getNumbersBeforeComma(inputString) {
    const numbersArray = inputString.split(",").map(Number);
    setR(numbersArray[0]);
    setG(numbersArray[1]);
    setB(numbersArray[2]);
  }

  function calculatePercentage(number, goal = 255) {
    if (goal === 0) {
      console.error(
        "Error: The goal should not be zero to avoid division by zero."
      );
      return null;
    }

    const percentage = (number / goal) * 100;
    return percentage.toFixed(1);
  }

  React.useEffect(() => {
    if (imgColors) {
      getNumbersBeforeComma(hex2rgb(imgColors[0]));
    }
  }, [imgColors]);

  return (
    <center>
      <h2>Image Selector</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {selectedImage && (
        <>
          <div>
            <ColorExtractor getColors={(colors) => setImgColors(colors)}>
              <img
                onClick={() => setRgbTF(!rgbtf)}
                className="select_img"
                src={selectedImage}
                alt="Selected"
                style={{
                  // border: `5px rgb(${cr}, ${cg}, ${cb}) solid`,
                  borderRadius: "20px",
                  boxShadow: `2px 12px 125px rgba(${cr}, ${cg}, ${cb}, 1)`,
                }}
              />
            </ColorExtractor>
            <div
              style={{
                display: "flex",
                gap: "1px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {imgColors?.map((hexcode, index) => (
                <div
                  style={{
                    backgroundColor: hexcode,
                    width: "10vh",
                    height: "3vh",
                    padding: "20px",
                    display: "flex",
                    // borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => getNumbersBeforeComma(hex2rgb(hexcode))}
                >
                  {rgbtf ? hexcode : hex2rgb(hexcode)}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: `rgb(${cr},${cg}, ${cb})`,
              width: "20vh",
              height: "10vh",
              padding: "20px",
              marginTop: "20px",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            R = {cr}({calculatePercentage(cr)}%)
            <br /> G = {cg}({calculatePercentage(cg)}%)
            <br /> B = {cb}({calculatePercentage(cb)}%)
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "70px",
              transform: "rotate(-90deg)",
              flexDirection: "column",
              height: "10vh",
              width: "20vh",
              marginLeft: "-40px",
              gap: "40px",
            }}
          >
            <input
              type="range"
              onChange={(e) => setR(e.target.value)}
              name="colorRange"
              min="0"
              value={cr}
              max="255"
              className="cr"
            />
            <input
              type="range"
              className="cg"
              onChange={(e) => setG(e.target.value)}
              name="colorRange"
              value={cg}
              min="0"
              max="255"
            />
            <input
              className="cb"
              type="range"
              onChange={(e) => setB(e.target.value)}
              name="colorRange"
              value={cb}
              min="0"
              max="255"
            />
          </div>
        </>
      )}
    </center>
  );
};

export default App;
