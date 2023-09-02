import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Dots from "./Dots";

const FullPageScroll = ({
  children,
  onLoad = () => {},
  onPageChange = () => {},
}) => {
  const outerDivRef = useRef(null);
  const currentPage = useRef(0);
  const canScroll = useRef(true);
  const oldTouchY = useRef(0);

  const [refresh, setRefresh] = useState(0);

  const getPageHeight = () => {
    // 화면 세로 길이 100vh
    return outerDivRef.current?.children.item(0)?.clientHeight;
  };

  // 다음 페이지로
  const scrollDown = () => {
    const pageHeight = getPageHeight();

    if (outerDivRef.current && pageHeight) {
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current + 1),
        left: 0,
        behavior: "smooth",
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 500);

      if (outerDivRef.current.childElementCount - 1 > currentPage.current) {
        currentPage.current++;
      }
    }

    console.log("scrollDown currentPage: ", currentPage.current);
    onPageChange(currentPage.current);
    setRefresh(refresh + 1);
  };

  // 이전 페이지로
  const scrollUp = () => {
    const pageHeight = getPageHeight();

    if (outerDivRef.current && pageHeight) {
      outerDivRef.current.scrollTo({
        top: pageHeight * (currentPage.current - 1),
        left: 0,
        behavior: "smooth",
      });
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 500);

      if (currentPage.current > 0) {
        currentPage.current--;
      }
    }

    console.log("scrollUp currentPage: ", currentPage.current);
    onPageChange(currentPage.current);
    setRefresh(refresh + 1);
  };

  // 마우스 휠 감지
  const wheelHandler = (e) => {
    e.preventDefault();

    if (!canScroll.current) return;

    // + : down, - : up
    const { deltaY } = e;
    console.log("scroll to ", outerDivRef.current?.scrollHeight);
    if (deltaY > 0 && outerDivRef.current) {
      scrollDown();
    } else if (deltaY < 0 && outerDivRef.current) {
      scrollUp();
    }
  };

  // 스크롤 기능 비활성화 함수
  const scrollHandler = (e) => {
    e.preventDefault();
  };

  // 터치로 스크롤 했을 때 페이지 이동 가능하게 하는 함수
  const onTouchDown = (e) => {
    oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
  };

  const onTouchUp = (e) => {
    const currentTouchY = e.changedTouches.item(0)?.clientY || 0;
    const isScrollDown = oldTouchY.current - currentTouchY > 0 ? true : false;

    if (isScrollDown) {
      scrollDown();
    } else {
      scrollUp();
    }
  };

  // Dot 을 눌렀을 때 해당 페이지로 이동하는 함수
  const movePageTo = (index) => {
    const num = currentPage.current;

    if (index > num) {
      for (let i = 0; i < index - num; i++) {
        scrollDown();
      }
    } else if (index < num) {
      for (let i = 0; i < num - index; i++) {
        scrollUp();
      }
    }
  };

  useEffect(() => {
    const outer = outerDivRef.current;

    if (!outer) return;

    onLoad(outerDivRef.current.childElementCount);
    setRefresh(refresh + 1);

    outer.addEventListener("wheel", wheelHandler);
    outer.addEventListener("scroll", scrollHandler);
    outer.addEventListener("touchmove", scrollHandler);
    outer.addEventListener("touchstart", onTouchDown);
    outer.addEventListener("touchend", onTouchUp);

    return () => {
      outer.removeEventListener("wheel", wheelHandler);
      outer.removeEventListener("scroll", scrollHandler);
      outer.removeEventListener("touchmove", scrollHandler);
      outer.removeEventListener("touchstart", onTouchDown);
      outer.removeEventListener("touchend", onTouchUp);
    };
  }, []);

  return (
    <>
      <Container ref={outerDivRef}>{children}</Container>

      <Dots
        limit={outerDivRef.current?.childElementCount || 0}
        currentIndex={currentPage.current}
        onDotClick={movePageTo}
      />
    </>
  );
};

export default FullPageScroll;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: orange;
`;
