import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

export default function Product({ product }) {
  const useStyles = makeStyles({
    card: {
      boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fafafa',
      width: '100%',
      height: 'fit-content',
      margin: '5% 0',
    },
    media: {
      width: '100%',
      height: '80%',
      borderBottom: '1px solid #393E46'
    },
    productTitle: {
      fontSize: '150%'
    }
  });

  const classes = useStyles();
  const hdThumbnail = product.thumbnail.replace('-I', '-W');

  return (
    <Card
      key={product.id}
      className={classes.card}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          alt={product.title}
          image={hdThumbnail}
        />
        <CardContent>
          <Typography
            component="div"
            className={classes.productTitle}
          >
            {product.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>);
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.shape({
      replace: PropTypes.func
    }),
    title: PropTypes.string
  })
};
