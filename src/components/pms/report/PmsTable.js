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

import SupplierIcon from '../../../img/supplier-icon.png';
import PurchaseOrderIcon from '../../../img/purchaseOrderIcon.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  root2: {
    marginTop: 40,
    maxWidth: 345
  },
  media: {
    height: '300'
  }
});

const PmsTable = props => {
  const { pmsHandler } = props;

  const pmsHandlerr = event => {
    pmsHandler();
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='h3'>
            Purchase Management Report
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root} onClick={pmsHandlerr}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Supplier Icon'
                height='250'
                image={SupplierIcon}
                title='Supplier Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Supplier List
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
                height='250'
                image={PurchaseOrderIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Purchase Order List
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height='250'
                image={SupplierIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height='250'
                image={SupplierIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>{' '}
        <Grid item xs={3}>
          <Card className={classes.root2}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Inventory Icon'
                height='150'
                image={SupplierIcon}
                title='Inventory Icon'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PmsTable;
