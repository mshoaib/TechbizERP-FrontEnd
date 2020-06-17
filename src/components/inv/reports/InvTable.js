import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import InventoryIcon from '../../../img/InventoryIcon.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  root2: {
    marginTop: 40,
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const InvTable = props => {
  const { invHandler } = props;

  const invHandlerr = event => {
    invHandler();
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='h3'>
            Inventory Report
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root} onClick={invHandlerr}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height={classes.media}
                image={InventoryIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Item List
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions> */}
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height={classes.media}
                image={InventoryIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions> */}
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height={classes.media}
                image={InventoryIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions> */}
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height={classes.media}
                image={InventoryIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions> */}
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root2}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height={classes.media}
                image={InventoryIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
            <Button size='small' color='primary'>
              Share
            </Button>
            <Button size='small' color='primary'>
              Learn More
            </Button>
          </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default InvTable;
