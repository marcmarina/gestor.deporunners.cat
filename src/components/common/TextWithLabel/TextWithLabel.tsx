import React from 'react';
import { Tooltip, Typography, Zoom } from '@material-ui/core';

import './style.css';

interface Props {
  label: string;
  text: string;
  variant: 'full' | 'outlined' | 'text';
  textVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'srOnly';
}

export default function TextWithLabel({
  label,
  text,
  variant = 'text',
  textVariant = 'body1',
}: Props) {
  return (
    <div className="component-container">
      <Tooltip
        title="Copiar"
        aria-label="add"
        placement="left"
        TransitionComponent={Zoom}
        enterDelay={500}
      >
        <div
          className="label-container"
          onClick={() => navigator.clipboard.writeText(text)}
        >
          <Typography className={`label ${variant}`} variant="button">
            {label}
          </Typography>
        </div>
      </Tooltip>
      <Typography variant={textVariant}>{text}</Typography>
    </div>
  );
}
