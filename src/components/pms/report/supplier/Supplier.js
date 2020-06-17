import React, { useState, useCallback, Fragment } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdbreact';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { Table } from '../Table';
import SupplierFilter from './SupplierFilter';

const Supplier = props => {
  const [suppliers, setSuppliers] = useState([]);
  const [cities, setcities] = useState([]);
  const [supplierTypes, setsupplierTypes] = useState([]);
  const [city, setCity] = useState('');
  const [type, settype] = useState('');

  const onClickType = value => {
    settype(value);
  };
  const onClickCity = value => {
    setCity(value);
  };
  const onClickReset = value => {
    setCity('');
    settype('');
  };

  const onClickBack = () => {
    setCity('');
    settype('');
    props.onClickBack();
  };

  const fetchSuppliers = useCallback(async () => {
    try {
      let response = await await axios(
        `http://localhost:5000/api/pms/suppliers/?${city && `city=${city}`}&${
          type && `type=${type}`
        } `
      );

      let suppliers = await response.data;

      setSuppliers(suppliers);
    } catch (err) {}
  }, [city, type]);

  const fetchCitiesAndTypes = useCallback(async () => {
    try {
      let response2 = await await axios('http://localhost:5000/api/pms/types');
      let response3 = await await axios('http://localhost:5000/api/pms/cities');

      let citiess = await response3.data;
      let types = await response2.data;

      setcities(citiess);
      setsupplierTypes(types);
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers, type, city]);

  useEffect(() => {
    fetchCitiesAndTypes();
  }, [fetchCitiesAndTypes]);

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
          Supplier List
        </Typography>
      </div>

      <SupplierFilter
        suppliers={suppliers}
        cities={cities}
        types={supplierTypes}
        type={type}
        city={city}
        title='Item List'
        onClickType={e => {
          onClickType(e);
        }}
        onClickCity={e => {
          onClickCity(e);
        }}
        handleReset={onClickReset}
      />

      <Table suppliers={suppliers} title='Supplier List' />
    </Fragment>
  );
};

export default Supplier;
