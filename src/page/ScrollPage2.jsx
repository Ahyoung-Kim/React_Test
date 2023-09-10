import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import styled, { keyframes } from "styled-components";

const Page = ({ children, id, style, contentStyle = {} }) => {
  return (
    <PageDiv id={id} style={style}>
      <Contents style={contentStyle}>{children}</Contents>
    </PageDiv>
  );
};

const ScrollPage2 = () => {
  const ref = useRef(null);
  const curr = useRef(1);
  const timeoutRef = useRef(false);
  const oldTouchY = useRef(0);

  const scrollDown = () => {
    const dest = curr.current + 1;

    if (dest > 3) return;

    const currEl = ref.current?.children?.item(curr.current - 1);
    const nextEl = ref.current?.children?.item(curr.current);

    currEl.children.item(0).classList.remove("active");
    nextEl.children.item(0).classList.add("active");

    currEl.style.top = "-100%";
    curr.current = dest;
  };

  const scrollUp = () => {
    const dest = curr.current - 1;

    if (dest < 1) return;

    const currEl = ref.current?.children?.item(curr.current - 1);
    const prevEl = ref.current?.children?.item(curr.current - 2);

    currEl.children.item(0).classList.remove("active");
    // prevEl.children.item(0).classList.add("active");

    prevEl.style.top = 0;
    curr.current = dest;
  };

  const onScroll = useCallback((deltaY) => {
    if (!timeoutRef.current) {
      const currentItem = ref.current?.children?.item(curr.current - 1);
      const contents = currentItem.children.item(0);

      const diff = contents.clientHeight - window.innerHeight;
      const scrollTop = currentItem.scrollTop;

      if (diff > 0) {
        if (diff === scrollTop && deltaY > 0) {
          scrollDown();
        } else if (scrollTop === 0 && deltaY < 0) {
          scrollUp();
        }
      } else {
        if (deltaY > 0) {
          scrollDown();
        } else {
          scrollUp();
        }
      }

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 1500);
    }
  }, []);

  const handleMouseWheel = useCallback((e) => {
    const { deltaY } = e;
    onScroll(deltaY);
  }, []);

  const onTouchStart = (e) => {
    oldTouchY.current = e.changedTouches.item(0)?.clientY || 0;
  };

  const onTouchEnd = (e) => {
    const currentY = e.changedTouches.item(0)?.clientY || 0;
    const deltaY = oldTouchY.current - currentY;

    onScroll(deltaY);
  };

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    container.addEventListener("wheel", handleMouseWheel);
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleMouseWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Container ref={ref}>
      <Page id="page1" style={{ backgroundColor: "orange", zIndex: 3 }}>
        page1
      </Page>
      <Page
        id="page2"
        style={{
          backgroundColor: "aqua",
          zIndex: 2,
        }}
        contentStyle={{ height: "200vh", backgroundColor: "purple" }}
      >
        page2
      </Page>
      <Page id="page3" style={{ backgroundColor: "royalblue", zIndex: 1 }}>
        page3
      </Page>
    </Container>
  );
};

export default ScrollPage2;

const Container = styled.div`
  width: 100%;
  background-color: #ddd;
  position: relative;
  height: 100vh;
`;

const move = keyframes`
from {
    transform: translateY(15vh);
    opacity: 0;
}

to {
    transform: translateY(0);
    opacity: 1;
}
`;

const PageDiv = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  position: absolute;
  top: 0;
  left: 0;
  transition: 1s;
`;

const Contents = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;

  &.active {
    animation: ${move} 2s ease forwards;
  }
`;
