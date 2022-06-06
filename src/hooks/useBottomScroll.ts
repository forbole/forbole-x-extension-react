import React from 'react';

/**
 * A hook that runs a callback if a specified ref has been scrolled to bottom.
 */
const useBottomScroll = (callback: () => void) => {
  const scrollRef = React.useRef();

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        callback();
      }
    }
  };

  return {
    scrollRef,
    onScroll,
  };
};

export default useBottomScroll;
