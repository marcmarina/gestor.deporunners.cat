import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';

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
      <Tooltip title="Copiar" aria-label="add" placement="left">
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
