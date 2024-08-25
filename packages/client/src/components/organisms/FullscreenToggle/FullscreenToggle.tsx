import React, { useRef, useState } from 'react';

import {
  ChevronsCollapseUpRight,
  ChevronsExpandUpRight,
} from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';

import type {
  ExtendedDocument,
  ExtendedHTMLDivElement,
  FullscreenToggleProps,
} from './FullscreenToggle.types';
import { Button } from '../../atoms/Button';

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const elementRef = useRef<ExtendedHTMLDivElement>(null);

  const toggleFullscreen = () => {
    const elem = elementRef.current;

    if (elem) {
      if (!isFullscreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
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
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      ref={elementRef}
      style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <Button onClick={toggleFullscreen} view="outlined">
        {isFullscreen ? (
          <Icon data={ChevronsCollapseUpRight} size={18} />
        ) : (
          <Icon data={ChevronsExpandUpRight} size={18} />
        )}
        {isFullscreen ? 'Full screen Off' : 'Full screen On'}
      </Button>
      {children}
    </div>
  );
};
