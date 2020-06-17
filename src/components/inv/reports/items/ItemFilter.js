import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

export const ItemFilters = props => {
  const [value, setValue] = useState(null);
  const {
    subCategories,
    subCategory,
    isPurchasable,
    isSalesItem,
    isInventoryItem,
    onClickSubCategory,
    onClickisPurchasable,
    onClickisSalesItem,
    onClickisInventoryItem,
    handleReset
  } = props;

  const test = {
    something: 'hi'
  };
  const test2 = {
    something: 'hi'
  };
  const test3 = {
    something: 'hi'
  };

  isInventoryItem && (test2.checked = true);
  isPurchasable && (test3.checked = true);
  isSalesItem && (test.checked = true);

  const SubCategoriesProps = {
    options: subCategories.data,
    getOptionLabel: option => option.Item_Sub_Category_Name || ''
  };

  const handleSubCategoryChange = (event, newValue) => {
    if (newValue == null) {
      setValue(null);
      onClickSubCategory(null);
    } else {
      setValue(newValue);
      onClickSubCategory(newValue.Item_Sub_Category_Name);
    }
  };

  const handlePurchasableChange = event => {
    onClickisPurchasable(event.target.checked === true ? 'Y' : null);
  };
  const handleSalesChange = event => {
    onClickisSalesItem(event.target.checked === true ? 'Y' : null);
  };
  const handleInventoryChange = event => {
    onClickisInventoryItem(event.target.checked === true ? 'Y' : null);
  };
  const handleResetChange = event => {
    setValue(null);
    handleReset();
  };

  return (
    <Fragment>
      <div style={{ textAlign: 'left', marginTop: '10', paddingTop: 10 }}>
        <Typography gutterBottom variant='h5' component='h5'>
          Searching Criteria
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'normal'
        }}
      >
        {subCategories.data && (
          <Autocomplete
            {...SubCategoriesProps}
            //searchText={value}
            id='controlled-demo'
            value={value}
            style={{ width: 200, marginRight: 10 }}
            onChange={handleSubCategoryChange}
            renderInput={params => (
              <TextField {...params} label='Sub Category' margin='normal' />
            )}
          />
        )}

        <div
          className='custom-control custom-checkbox'
          style={{
            marginRight: 13,
            marginLeft: 13,
            paddingTop: 40
          }}
        >
          <input
            type='checkbox'
            className='custom-control-input'
            id='defaultUncheckedDisabled1'
            onClick={handlePurchasableChange}
            {...test3}
          ></input>
          <label
            className='custom-control-label'
            htmlFor='defaultUncheckedDisabled1'
          >
            Purchasable
          </label>
        </div>
        <div
          style={{
            marginRight: 13,
            marginLeft: 13,
            paddingTop: 40
          }}
          className='custom-control custom-checkbox'
        >
          <input
            type='checkbox'
            className='custom-control-input'
            id='defaultUncheckedDisabled3'
            {...test2}
            onClick={handleInventoryChange}
          ></input>
          <label
            className='custom-control-label'
            htmlFor='defaultUncheckedDisabled3'
          >
            Inventory Item
          </label>
        </div>
        <div
          style={{
            marginRight: 13,
            marginLeft: 13,
            paddingTop: 40
          }}
          className='custom-control custom-checkbox'
        >
          <input
            type='checkbox'
            className='custom-control-input'
            id='defaultUncheckedDisabled2'
            onClick={handleSalesChange}
            {...test}
          ></input>
          <label
            className='custom-control-label'
            htmlFor='defaultUncheckedDisabled2'
          >
            Sales Item
          </label>
        </div>

        <MDBBtn
          style={{ height: '20%', marginTop: 20 }}
          color='indigo'
          onClick={handleResetChange}
        >
          Reset Filter
        </MDBBtn>

        <Link
          style={{ color: 'white', paddingTop: 15 }}
          target='_blank'
          to={`/report?title=Item&subCategory=${subCategory}&isSalesItem=${isSalesItem}&isInventoryItem=${isInventoryItem}&isPurchasable=${isPurchasable}`}
        >
          <MDBBtn color='indigo'>Print Report</MDBBtn>
        </Link>
      </div>
    </Fragment>
  );
};

export default ItemFilters;
