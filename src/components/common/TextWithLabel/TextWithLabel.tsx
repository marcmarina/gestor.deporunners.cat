import { Typography } from '@material-ui/core';
import React from 'react';

import './style.css';

interface Props {
  label: string;
  text: string;
  variant: 'full' | 'outlined';
}

export default function TextWithLabel({
  label,
  text,
  variant = 'full',
}: Props) {
  return (
    <div className="container">
      <div className="label-container">
        <Typography className={`label ${variant}`} variant="button">
          {label}
        </Typography>
      </div>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
}
