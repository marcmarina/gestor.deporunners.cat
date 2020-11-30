import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
// import MapIcon from '@material-ui/icons/Map';
// import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';

import Clothing from 'interfaces/Clothing';
import ConfirmDialog from 'components/common/ConfirmDialog';
import http from 'services/http';

interface Props {
  clothing: Clothing;
  onClickEdit: () => void;
}

export default function ClothingCard({ clothing, onClickEdit }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { _id, name, ref, image, price } = clothing;

  const deleteClothing = async () => {
    try {
      await http.delete(`/clothing/${_id}`);
      setShowDeleteDialog(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Card>
      <CardHeader title={name} subheader={ref} />
      <img
        className="item-image"
        alt="Product"
        src={`${process.env.REACT_APP_API_URL}/${image}`}
      />
      <CardActions disableSpacing>
        <Typography
          style={{
            color: 'green',
            fontSize: 18,
          }}
          variant="button"
        >
          {price.toFixed(2)}€
        </Typography>
        <IconButton
          onClick={onClickEdit}
          style={{ color: 'orange', marginLeft: 'auto' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          style={{ color: 'tomato' }}
          onClick={() => setShowDeleteDialog(true)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <ConfirmDialog
        text="Segur que vols eliminar aquest event? Aquesta acció es irreversible."
        title="Confirmar Operació"
        open={showDeleteDialog}
        handleYes={deleteClothing}
        handleNo={() => setShowDeleteDialog(false)}
      />
    </Card>
  );
}
