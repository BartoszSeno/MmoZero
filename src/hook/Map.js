import React, { useState, useEffect } from "react";
import LazyLoadTd from "./LazyLoadTd";

function MainMap({ children }) {
  const [RowOne, setRowOne] = useState([
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m1.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m2.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m3.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m4.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m5.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m6.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m7.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowOne/r1m8.png",
    },
  ]);
  const [RowTwo, setRowTwo] = useState([
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m1.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m2.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m3.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m4.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m5.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m6.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m7.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowTwo/r2m8.png",
    },
  ]);
  const [RowThree, setRowThree] = useState([
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m1.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m2.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m3.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m4.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m5.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m6.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m7.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowThree/r3m8.png",
    },
  ]);
  const [RowFour, setRowFour] = useState([
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m1.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m2.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m3.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m4.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m5.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m6.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m7.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFour/r4m8.png",
    },
  ]);
  const [RowFive, setRowFive] = useState([
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m1.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m2.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m3.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m4.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m5.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m6.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m7.png",
    },
    {
      width: 2000,
      height: 2000,
      test: "mapa1",
      image:
        "https://raw.githubusercontent.com/BartoszSeno/MmoZero/master/src/asset/image/world/RowFive/r5m8.png",
    },
  ]);

  // Funkcja do zliczania liczby przedmiotów w danej tablicy
  function countItems(row) {
    return row.length;
  }

  // Obliczanie liczby przedmiotów w każdej z tablic
  const itemCountRowOne = countItems(RowOne);
  const itemCountRowTwo = countItems(RowTwo);
  const itemCountRowThree = countItems(RowThree);
  const itemCountRowFour = countItems(RowFour);
  const itemCountRowFive = countItems(RowFive);

  // Znajdź największą liczbę przedmiotów spośród trzech tablic
  const maxItemCount = Math.max(
    itemCountRowOne,
    itemCountRowTwo,
    itemCountRowThree,
    itemCountRowFour,
    itemCountRowFive
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
                src={row.image}
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
                image={RowTwo.image}
                src={RowTwo.image}
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
                src={RowThree.image}
              />
            ))}
          </tr>
          <tr>
            {RowFour.map((RowFour, index) => (
              <LazyLoadTd
                key={index}
                width={RowFour.width}
                height={RowFour.height}
                test={RowFour.test}
                src={RowFour.image}
              />
            ))}
          </tr>
          <tr>
            {RowFive.map((RowFive, index) => (
              <LazyLoadTd
                key={index}
                width={RowFive.width}
                height={RowFive.height}
                test={RowFive.test}
                src={RowFive.image}
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
