import React from 'react';
import { Tooltip, Typography, Zoom } from '@material-ui/core';

import './style.css';

interface Props {
  label: string;
  text: string;
  variant: 'full' | 'outlined' | 'text';
}

export default function TextWithLabel({
  label,
  text,
  variant = 'text',
}: Props) {
  return (
    <div className="container">
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
      <Typography variant="h6">{text}</Typography>
    </div>
  );
}
