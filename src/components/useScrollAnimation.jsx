import React, { useCallback, useEffect, useRef, useState } from "react";

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);

  const ref = useRef(null);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    });
  };

  useEffect(() => {
    const options = { root: null, rootMargin: "0px", threshold: 0.2 };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); // 요소 관찰 시작

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
    };
  }, []);

  return { inView, ref };
};

export default useScrollAnimation;
