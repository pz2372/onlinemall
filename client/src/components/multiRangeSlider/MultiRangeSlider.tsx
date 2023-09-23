import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./MultiRangeSlider.module.scss";
import { TMultiRangeSliderProps } from "../../types/props.type";

const MultiRangeSlider = ({
  min,
  max,
  setMinRangeVal,
  setMaxRangeVal,
}: TMultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="relative">
      <span className="block mb-5">Price range</span>
      <div className="flex items-center justify-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onMouseUp={(event: React.MouseEvent) => {
            const value = Math.min(
              Number((event.target as HTMLInputElement).value),
              maxVal - 1
            );
            setMinRangeVal(value);
          }}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={`${styles.thumb} ${styles.thumbLeft}`}
          style={{ zIndex: minVal > max - 100 ? "5" : "" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onMouseUp={(event: React.MouseEvent) => {
            const value = Math.max(
              Number((event.target as HTMLInputElement).value),
              minVal + 1
            );
            setMaxRangeVal(value);
          }}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />

        <div className={styles.slider}>
          <div className={styles.sliderTrack} />
          <div ref={rangeRef} className={styles.sliderRange} />
          <div className={styles.sliderLeftValue}>{`$${minVal}`}</div>
          <div className={styles.sliderRightValue}>{`$${maxVal}`}</div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
