import { useEffect, useState, useRef } from 'react';


const THRESHOLD = 10;


const useScrollDistance = () => {
    const [scrollDistance, setScrollDistance] = useState(0);

    const blocking = useRef(false);
    const prevScrollY = useRef(0);
  
    useEffect(() => {
      prevScrollY.current = window.pageYOffset;
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const currentScrollDistance = Math.abs(scrollY - prevScrollY.current);
  
        if (currentScrollDistance >= THRESHOLD) {
          setScrollDistance(currentScrollDistance);
  
          prevScrollY.current = scrollY > 0 ? scrollY : 0;
        }
  
        blocking.current = false;
      };
  
      const onScroll = () => {
        if (!blocking.current) {
          blocking.current = true;
          window.requestAnimationFrame(updateScrollDirection);
        }
      };
  
      window.addEventListener('scroll', onScroll);
  
      return () => window.removeEventListener('scroll', onScroll);
    }, [scrollDistance]);
  
    return scrollDistance;

}


export { useScrollDistance };