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
      <Typography className="label" variant="button">
        {label}
      </Typography>
      <Typography className="text" variant="h6">
        {text}
      </Typography>
    </div>
  );
}
