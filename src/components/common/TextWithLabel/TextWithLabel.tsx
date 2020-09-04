import { Typography } from '@material-ui/core';
import React from 'react';

import './style.css';

interface Props {
  label: string;
  text: string;
}

export default function TextWithLabel({ label, text }: Props) {
  return (
    // <div className="component__container">
    //   <span className="label__container">{label}</span>{' '}
    //   <strong className="text__container">{text}</strong>
    // </div>
    <div className="component__container">
      <Typography className="label__container">{label}</Typography>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
}
