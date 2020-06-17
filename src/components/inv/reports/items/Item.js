import React, { useState, useCallback, Fragment } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdbreact';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { Table } from '../Table';
import { ItemFilters } from './ItemFilter';

const Item = props => {
  const [items, setItems] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [subCategory, setsubCategory] = useState(null);
  const [isPurchasable, setisPurchasable] = useState(null);
  const [isSalesItem, setisSalesItem] = useState(null);
  const [isInventoryItem, setisInventoryItem] = useState(null);

  const onClickSubCategory = value => {
    setsubCategory(value);
  };
  const onClickisPurchasable = value => {
    setisPurchasable(value);
  };
  const onClickisSalesItem = value => {
    setisSalesItem(value);
  };
  const onClickisInventoryItem = value => {
    setisInventoryItem(value);
  };

  const onClickReset = value => {
    setsubCategory(null);
    setisPurchasable(null);
    setisSalesItem(null);
    setisInventoryItem(null);
  };

  const onClickBack = () => {
    setsubCategory(null);
    setisPurchasable(null);
    setisSalesItem(null);
    setisInventoryItem(null);
    props.onClickBack();
  };

  const fetchItemLists = useCallback(async () => {
    try {
      let response = await await axios(
        `http://localhost:5000/api/inv/items/?${
          subCategory && `subCategory=${subCategory}`
        }&${isPurchasable && `purchasableItem=${isPurchasable}`}
        &${isSalesItem && `SalesOrderItem=${isSalesItem}`}
        &${isInventoryItem && `InventoryItem=${isInventoryItem}`}
        `
      );

      let data = await response.data;

      setItems(data);
    } catch (err) {}
  }, [subCategory, isPurchasable, isSalesItem, isInventoryItem]);

  const fetchSubCategories = useCallback(async () => {
    try {
      let response = await await axios(
        `http://localhost:5000/api/inv/subcategory`
      );

      let cat = await response.data;

      setsubCategories(cat);
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchItemLists();
  }, [
    fetchItemLists,
    subCategory,
    isPurchasable,
    isSalesItem,
    isInventoryItem
  ]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  return (
    <Fragment>
      <div style={{ textAlign: 'left' }}>
        <MDBBtn
          style={{ height: '20%', width: 200 }}
          outline
          color='indigo'
          onClick={onClickBack}
        >
          Report Dashboard
        </MDBBtn>

        <Typography
          style={{
            textAlign: 'center',
            display: 'inline',
            marginLeft: 300
          }}
          gutterBottom
          variant='h3'
          component='h3'
        >
          Item List
        </Typography>
      </div>

      <ItemFilters
        items={items}
        title='Item List'
        subCategories={subCategories}
        subCategory={subCategory}
        isPurchasable={isPurchasable}
        isSalesItem={isSalesItem}
        isInventoryItem={isInventoryItem}
        onClickSubCategory={e => {
          onClickSubCategory(e);
        }}
        onClickisPurchasable={e => {
          onClickisPurchasable(e);
        }}
        onClickisSalesItem={e => {
          onClickisSalesItem(e);
        }}
        onClickisInventoryItem={e => {
          onClickisInventoryItem(e);
        }}
        handleReset={onClickReset}
      />

      <Table items={items} title='Item List' />
    </Fragment>
  );
};

export default Item;
