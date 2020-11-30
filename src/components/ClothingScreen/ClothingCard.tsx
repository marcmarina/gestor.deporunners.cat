import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

import Clothing from 'interfaces/Clothing';

interface Props {
  clothing: Clothing;
  onClickEdit: () => void;
}

export default function ClothingCard({ clothing, onClickEdit }: Props) {
  const { name, price, _id, ref, sizes, image } = clothing;

  return (
    <Card>
      <CardHeader title={name} subheader={ref} />
      <img
        className="item-image"
        alt="Product"
        src={`${process.env.REACT_APP_API_URL}/${image}`}
      />
      {/* <CardActions disableSpacing></CardActions> */}
    </Card>
  );
}
