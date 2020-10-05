import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({ root: { maxWidth: 345 } })
);

interface Props {
  title: string;
  description: string;
  dateTime: string;
  coordinates: string;
  onClickEdit: () => void;
}

export default function RecipeReviewCard({
  title,
  description,
  dateTime,
  coordinates,
  onClickEdit,
}: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={title} subheader={dateTime} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onClickEdit}>
          <EditIcon />
        </IconButton>
        <IconButton
          href={`http://www.google.com/maps/place/${coordinates}`}
          target="__blank"
          aria-label="share"
        >
          <MapIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
