import React from 'react';

import type {
  ExtendedDocument,
  ExtendedHTMLDivElement,
  FullscreenToggleProps,
} from './FullscreenToggle.types';

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  children,
}) => {
  const toggleFullscreen = (
    elementRef: React.RefObject<ExtendedHTMLDivElement>,
    isFullscreen: boolean
  ): boolean => {
    const elem = elementRef.current;

    if (!isFullscreen) {
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
        return true;
      }
    } else {
      const doc = document as ExtendedDocument;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }

    return false;
  };

  return <>{React.cloneElement(children, { toggleFullscreen })}</>;
};
