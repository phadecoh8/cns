'use client';

import { Clock3 } from 'lucide-react';
import {
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  useEffect,
  useState,
} from 'react';
import { landingCopy } from '@/content/landing-copy';

export function MapAnimation() {
  const reduceMotion = useReducedMotion();
  const [lowDataMode, setLowDataMode] = useState(false);
  const shouldAnimate = !reduceMotion && !lowDataMode;

  useEffect(() => {
    setLowDataMode(
      window.localStorage.getItem('cns-low-data-mode') === 'true',
    );
  }, []);

  return (
    <section className="map-section" aria-labelledby="map-title">
      <div className="container map-layout">
        <div className="map-copy">
          <p className="eyebrow">Know your way</p>
          <h2 className="section-title" id="map-title">
            Walk with confidence, from start to finish.
          </h2>
          <p>
            Follow a clear walking route from wherever you are to the exact
            building you need. No confusing landmarks. No getting lost.
          </p>
          <p className="map-caption">{landingCopy.animationCaption}</p>
        </div>
        <div className="map-visual" aria-label="Illustrated campus route">
          <svg viewBox="0 0 800 450" role="img">
            <title>Map route from your location to Central Library</title>
            <rect
              width="800"
              height="450"
              fill="var(--color-map-surface)"
            />
            <g className="map-roads">
              <path d="M-20 92c98-23 173-10 265 15s189 18 280-4 180-34 295-12" />
              <path d="M-20 344c113-28 174-10 287 5s213 30 553 1" />
              <path d="M142-20c-3 98 14 163 7 228s-29 145-31 270" />
              <path d="M570-20c-8 84-25 149-21 223s25 150 67 267" />
            </g>
            <g className="map-buildings">
              <rect x="214" y="48" width="112" height="52" rx="7" />
              <rect x="24" y="199" width="100" height="58" rx="7" />
              <rect x="405" y="157" width="112" height="62" rx="7" />
              <rect x="583" y="271" width="116" height="61" rx="7" />
              <rect x="205" y="274" width="133" height="69" rx="7" />
            </g>
            <g className="map-landmarks">
              <circle cx="382" cy="66" r="10" />
              <circle cx="604" cy="133" r="10" />
              <circle cx="716" cy="163" r="10" />
              <circle cx="82" cy="318" r="10" />
              <circle cx="385" cy="313" r="10" />
            </g>
            <motion.path
              d="M124 381c46-38 72-84 113-91s83-5 111-48 43-97 103-99 86 39 130 31 75-37 105-49"
              className="map-route"
              initial={shouldAnimate ? { strokeDashoffset: 24 } : false}
              animate={
                shouldAnimate
                  ? { strokeDashoffset: [24, 0] }
                  : undefined
              }
              transition={{
                duration: 1.2,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
            <rect
              x="83"
              y="326"
              width="52"
              height="34"
              rx="10"
              className="map-label"
            />
            <text x="109" y="348" className="map-label-text">
              You
            </text>
            <circle cx="124" cy="381" r="16" className="map-user-halo" />
            <circle cx="124" cy="381" r="9" className="map-user" />
            <rect
              x="598"
              y="62"
              width="132"
              height="38"
              rx="10"
              className="map-label"
            />
            <text x="664" y="86" className="map-label-text">
              Central Library
            </text>
            <path
              d={
                'M657 137c0-17 14-31 31-31s31 14 31 31 '
                + 'c0 24-31 53-31 53s-31-29-31-53Z'
              }
              className="map-pin"
            />
            <circle cx="688" cy="137" r="9" className="map-pin-hole" />
          </svg>
          <div className="map-legend">
            <span><i className="legend-dot user-dot" />Your location</span>
            <span><i className="legend-dot destination-dot" />Destination</span>
            <span className="walk-time">
              <Clock3 aria-hidden="true" size={17} />
              <strong>11 min walk</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
