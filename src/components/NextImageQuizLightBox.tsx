/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Lightbox from 'react-image-lightbox-rotation';

import 'react-image-lightbox-rotation/style.css';

import NextImage from '@/components/NextImage';

import { ExtractProps } from '@/types/helper';

type NextImageLightboxProps = {
  src: string;
} & ExtractProps<typeof NextImage>;

export default function NextImageQuizLightbox(props: NextImageLightboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='cursor-zoom-in'>
      <img onClick={() => setIsOpen(true)} {...props} />
      {isOpen && (
        <Lightbox
          mainSrc={props.src}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
