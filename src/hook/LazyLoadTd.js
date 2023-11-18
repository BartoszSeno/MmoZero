import React, { useState, useEffect, useRef } from "react";

function LazyLoadTd({ width, height, test, src }) {
  const [isVisible, setIsVisible] = useState(false);
  const tdRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("entry.isIntersecting:", entry.isIntersecting);
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (tdRef.current) {
      observer.observe(tdRef.current);
    }

    return () => {
      if (tdRef.current) {
        observer.unobserve(tdRef.current);
      }
    };
  }, []);
  return (
    <td
      ref={tdRef}
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.5s ease-in-out",
        backgroundColor: "red",
        backgroundImage: `url("${src}")`,
        height: height,
        width: width,
      }}
    >
      {isVisible && test}
    </td>
  );
}

export default LazyLoadTd;
