import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

export const SupplierFilters = props => {
  const { type, city, onClickType, onClickCity, handleReset } = props;
  const [cityValue, setcityValue] = useState(null);
  const [typeValue, settypeValue] = useState(null);

  const CityProps = {
    options: props.cities.data,

    getOptionLabel: option => option.City_Name
  };
  const TypeProps = {
    options: props.types.data,

    getOptionLabel: option => option.Supplier_Type
  };

  const handleCityChange = (event, newValue) => {
    if (newValue == null) {
      setcityValue(null);
      onClickCity(null);
    } else {
      setcityValue(newValue);
      onClickCity(newValue.City_Name);
    }
  };
  const handleTypeChange = (event, newValue) => {
    if (newValue == null) {
      settypeValue(null);
      onClickType(null);
    } else {
      settypeValue(newValue);
      onClickType(newValue.Supplier_Type);
    }
  };
  const handleResetChange = event => {
    setcityValue(null);
    settypeValue(null);
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
          justifyItems: 'normal'
        }}
      >
        {props.cities.data && (
          <Autocomplete
            {...CityProps}
            id='include-input-in-list1'
            value={cityValue}
            style={{ width: 200, marginRight: 10 }}
            onChange={handleCityChange}
            renderInput={params => (
              <TextField {...params} label='City' margin='normal' />
            )}
          />
        )}
        {props.types.data && (
          <Autocomplete
            {...TypeProps}
            value={typeValue}
            id='include-input-in-list'
            includeInputInList
            style={{ width: 200, marginRight: 10 }}
            onChange={handleTypeChange}
            renderInput={params => (
              <TextField {...params} label='Supplier Type' margin='normal' />
            )}
          />
        )}
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
          to={`/report?title=Supplier&city=${city ? city : 'null'}&type=${
            type ? type : 'null'
          }`}
        >
          <MDBBtn color='indigo'>Print Report</MDBBtn>
        </Link>
      </div>
    </Fragment>
  );
};

export default SupplierFilters;
