import React from 'react';
interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?:string;
}

const ImageWithBasePath = (props: Image) => {
  // Combine the base path and the provided src to create the full image source URL
  const altText = String(props.alt);
  const fullSrc = `${'/react/template/'}${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={altText}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;