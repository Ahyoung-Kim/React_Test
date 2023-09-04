import React, { useEffect, useRef } from "react";

/**
 * 마우스 휠을 감지하여 콜백함수를 처리할 수 있는 ref 객체를 반환하는 커스텀 훅.
 * 디바운스 기법을 적용하여 트랙패드에서 많은 이벤트 발생해도 한 번만 처리함.
 * @param callback 마우스 휠 이후 처리될 콜백함수 (deltaY, scrollTop)을 인자로 받는다.
 */
// callback parameters: ref, deltaY, scrollTop
const useWheel = (callback) => {
  const ref = useRef(null);
  const timeoutRef = useRef(null); // for debounce

  const handleMouseWheel = (e) => {
    e.preventDefault();

    if (!timeoutRef.current) {
      callback(ref, e.deltaY, ref.current?.scrollTop);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 1500);
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    currentRef.addEventListener("wheel", handleMouseWheel);

    return () => {
      // 메모리 누수 방지를 위한 이벤트 제거
      currentRef.removeEventListener("wheel", handleMouseWheel);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [ref, callback]);

  return ref;
};

export default useWheel;
