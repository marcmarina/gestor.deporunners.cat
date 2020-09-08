import { Typography } from '@material-ui/core';
import React from 'react';

import './style.css';

interface Props {
  label: string;
  text: string;
}

export default function TextWithLabel({ label, text }: Props) {
  return (
    <div className="container">
      <div className="label-container">
        <Typography className="label outlined" variant="button">
          {label}
        </Typography>
      </div>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
}
