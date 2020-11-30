import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import Clothing from 'interfaces/Clothing';

import './style.css';
import ClothingCard from './ClothingCard';
import ClothingForm from './ClothingForm';
import http from 'services/http';

export default function EventsScreen() {
  const [open, setOpen] = useState(false);
  const [clothing, setClothing] = useState<Clothing[]>();
  const [singleClothing, setSingleClothing] = useState<Clothing>();

  const retrieveData = async () => {
    try {
      const { data } = await http.get('/clothing');
      setClothing(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (!clothing) return null;

  return (
    <div>
      <div className="clothing-header">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
            setSingleClothing(undefined);
          }}
        >
          Nou Producte
        </Button>
      </div>
      <Grid container spacing={4}>
        {clothing.map(item => (
          <Grid item sm={12} md={6} lg={3} key={item._id}>
            <ClothingCard
              clothing={item}
              onClickEdit={() => {
                setSingleClothing(item);
                setOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <ClothingForm
        open={open}
        setOpen={setOpen}
        onFinishSubmit={retrieveData}
        clothing={singleClothing}
      />
    </div>
  );
}
