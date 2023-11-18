import React, { useState, useEffect } from "react";
import LazyLoadTd from "./LazyLoadTd";

function MainMap({ children }) {
  const [RowOne, setRowOne] = useState([
    { width: 2000, height: 2000, test: "mapa1" },
    { width: 2000, height: 2000, test: "mapa2" },
    { width: 2000, height: 2000, test: "mapa3" },
  ]);
  const [RowTwo, setRowTwo] = useState([
    { width: 2000, height: 2000, test: "mapa4" },
    { width: 2000, height: 2000, test: "mapa5" },
    { width: 2000, height: 2000, test: "mapa6" },
  ]);
  const [RowThree, setRowThree] = useState([
    { width: 2000, height: 2000, test: "mapa7" },
    { width: 2000, height: 2000, test: "mapa8" },
    { width: 2000, height: 2000, test: "mapa9" },
  ]);

  // Funkcja do zliczania liczby przedmiotów w danej tablicy
  function countItems(row) {
    return row.length;
  }

  // Obliczanie liczby przedmiotów w każdej z tablic
  const itemCountRowOne = countItems(RowOne);
  const itemCountRowTwo = countItems(RowTwo);
  const itemCountRowThree = countItems(RowThree);

  // Znajdź największą liczbę przedmiotów spośród trzech tablic
  const maxItemCount = Math.max(
    itemCountRowOne,
    itemCountRowTwo,
    itemCountRowThree
  );

  return (
    <div style={{ width: maxItemCount * 2000 + "px" }}>
      <table>
        <tbody>
          <tr>
            {RowOne.map((row, index) => (
              <LazyLoadTd
                key={index}
                width={row.width}
                height={row.height}
                test={row.test}
              />
            ))}
          </tr>
          <tr>
            {RowTwo.map((RowTwo, index) => (
              <LazyLoadTd
                key={index}
                width={RowTwo.width}
                height={RowTwo.height}
                test={RowTwo.test}
              />
            ))}
          </tr>
          <tr>
            {RowThree.map((RowThree, index) => (
              <LazyLoadTd
                key={index}
                width={RowThree.width}
                height={RowThree.height}
                test={RowThree.test}
              />
            ))}
          </tr>
        </tbody>
      </table>
      {children}
    </div>
  );
}

export default MainMap;
