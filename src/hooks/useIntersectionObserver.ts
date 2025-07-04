import { useEffect, useRef } from "react";

type Props = {
  onIntersect: () => void;
  enabled: boolean;
};

export const useIntersectionObserver = ({ onIntersect, enabled }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: "100px", // 바닥에서 100px 전 미리 로드
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return ref;
};
