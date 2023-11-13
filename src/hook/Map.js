import React, { useState, useEffect } from "react";

function MainMap({ children }) {
  const [RowOne, setRowOne] = useState([
    { width: 1000, height: 1000, test: "mapa1" },
    { width: 1000, height: 1000, test: "mapa2" },
    { width: 1000, height: 1000, test: "mapa3" },
  ]);
  const [RowTwo, setRowTwo] = useState([
    { width: 1000, height: 1000, test: "mapa4" },
    { width: 1000, height: 1000, test: "mapa5" },
    { width: 1000, height: 1000, test: "mapa6" },
  ]);
  const [RowThree, setRowThree] = useState([
    { width: 1000, height: 1000, test: "mapa7" },
    { width: 1000, height: 1000, test: "mapa8" },
    { width: 1000, height: 1000, test: "mapa9" },
  ]);

  return (
    <div style={{ width: "3000px" }}>
      <table>
        <tbody>
          <tr>
            {RowOne.map((RowOne, index) => (
              <td
                key={index}
                style={{
                  overflow: "inherit",
                  backgroundColor: "red",
                  height: RowOne.height,
                  width: RowOne.width,
                }}
              >
                {RowOne.test}
              </td>
            ))}
          </tr>
          <tr>
            {RowTwo.map((RowTwo, index) => (
              <td
                key={index}
                style={{
                  backgroundColor: "yellow",
                  height: RowTwo.height,
                  width: RowTwo.width,
                }}
              >
                {RowTwo.test}
              </td>
            ))}
          </tr>
          <tr>
            {RowThree.map((RowThree, index) => (
              <td
                key={index}
                style={{
                  backgroundColor: "pink",
                  height: RowThree.height,
                  width: RowThree.width,
                }}
              >
                {RowThree.test}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {children}
    </div>
  );
}

export default MainMap;
