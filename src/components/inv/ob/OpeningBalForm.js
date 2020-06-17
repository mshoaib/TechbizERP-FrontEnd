import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API from '../../../baseURL';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const OpeningBalForm = props => {
  const { Organization_ID, User_ID } = useSelector(state => state.user);
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      Header_ID: props.type === 'update' ? props.record.Header_ID : '',
      Department_ID: props.type === 'update' ? props.record.Department_ID : '',
      Branch_ID: props.type === 'update' ? props.record.Branch_ID : '',
      Item_ID: props.type === 'update' ? props.record.Item_ID : '',
      From_Year: props.type === 'update' ? props.record.From_Year : '',
      To_Year: props.type === 'update' ? props.record.To_Year : '',
      Current_Bal: props.type === 'update' ? props.record.Current_Bal : '',
      Opening_Bal: props.type === 'update' ? props.record.Opening_Bal : ''
    }
  });

  // const [SupplierType, setSupplierType] = useState([]);
  // const [city, setCity] = useState([]);
  // const [country, setCountry] = useState([]);
  const [Item, setItem] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [Location, setLocation] = useState([]);

  const [Year, setYear] = React.useState(
    props.type === 'update' ? props.record.From_Year : ''
  );

  const [ready, setReady] = useState(false);
  const currentDate = moment();
  const watchValues = watch();
  console.log(Item);
  useEffect(() => {
    console.log(watchValues);
  });

  console.log(props);
  useEffect(() => {
    register({ name: 'Department_ID' }, { required: true });
    register({ name: 'Branch_ID' }, { required: true });
    register({ name: 'Item_ID' }, { required: true });
    register({ name: 'From_Year' }, { required: true });
    register({ name: 'To_Year' }, { required: true });
    register({ name: 'Current_Bal' }, { required: true });
    register({ name: 'Opening_Bal' }, { required: true });
  }, []); // eslint-disable-line

  useEffect(() => {
    axios
      .all([
        API.get(`/inv/department/${Organization_ID}`),
        API.get(`/inv/item/${Organization_ID}`),
        API.get(`/inv/branch/${Organization_ID}`)
      ])
      .then(
        axios.spread((url1, url2, url3) => {
          setLocation(url1.data);
          setItem(url2.data);
          setBranch(url3.data);

          console.log(url3.data);
          setReady(true);
        })
      )
      .catch(err => {
        console.log(err);
      });
  }, []); // eslint-disable-line

  const onSubmit = (data, e) => {
    console.log(e);
    if (props.type === 'insert') {
      OnInsert(data);
    } else {
      OnUpdate(data);
    }
  };

  const OnInsert = data => {
    /* Additional Values to Form */
    data = {
      ...data,

      Organization_ID: Organization_ID, // Replace
      // Enabled_Flag: data.Enabled_Flag === true ? 'Y' : 'N',
      // Current_Bal: data.Opening_Bal,
      Created_By: User_ID,
      Status: 'y',
      Creation_Date: currentDate.format('YYYY-MM-DD'),
      Last_Updated_By: User_ID
      // Last_Updated_Date: currentDate.format("YYYY-MM-DD HH:mm:ss"),
    };

    API.post('/inv/create-opening-bal', data, {
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (response.status === 200) swal('New Record Created!', '', 'success');
        props.onClose(false);
        props.getData();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          swal('Entry Failed!', error.message, 'error');
        } else if (error.response.status === 403) {
          swal(
            'Cannot add item with the same financial combination!',
            error.message,
            'error'
          );
        }
      });
  };

  //  console.log(props.record);

  /* UPDATE FORM FUNCTION */
  const OnUpdate = data => {
    const { Header_ID, Header_Name } = props.record;
    // if (
    //   data.Supplier_ID === Supplier_ID &&
    //   data.User_ID === User_ID &&
    //   (data.Enabled_Flag === true ? 1 : "Y") === Enabled_Flag
    // ) {
    //   alert("No Data Change To Be Noted");
    //   return;
    // }

    data = {
      ...data,
      // Enabled_Flag: data.Enabled_Flag === true ? 'Y' : 'N',
      Created_By: User_ID,
      Last_Updated_By: User_ID, // temp Changed With User_ID
      // Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
      Organization_ID: Organization_ID
    };

    console.log('data ---- > ', data);
    API.put(`inv/update-opening-bal/${Header_ID}`, data, {
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) swal('Record Updated!', '', 'success');
        props.onClose(false);
        props.getData();
      })
      .catch(function (error) {
        console.log('response.error', error);
        if (error.response.status === 400 || error.response.status === 404) {
          swal('Entry Failed!', error.message, 'error');
        } else if (error.response.status === 403) {
          swal(
            'Cannot add item with the same financial combination!',
            error.message,
            'error'
          );
        }
      });
  };

  return (
    <div style={{ margin: '0 10px' }}>
      {ready ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '100%' }}>
          <p style={{ color: '#113C87' }} className='h5 text-left py-1'>
            {' '}
            Opening Balance{' '}
          </p>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id='standard-search'
                autoComplete='off'
                fullWidth
                defaultValue={
                  props.type === 'update' ? props.record.Document_No : ''
                }
                name='Document_No'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 255 })}
                label='Document No'
                disabled
                value={
                  props.type === 'update'
                    ? props.record.Document_No
                    : `Open-${Math.random()}`
                }
              />
              {errors.Document_No && errors.Document_No.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='standard-search'
                autoComplete='off'
                fullWidth
                defaultValue={
                  props.type === 'update' ? props.record.Document_Date : ''
                }
                name='Document_Date'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 255 })}
                label='Document Date'
                disabled
                value={
                  props.type === 'update'
                    ? props.record.Document_Date
                    : new Date().toLocaleDateString()
                }
              />
              {errors.Document_Date &&
                errors.Document_Date.type === 'required' && (
                  <p className='form_error'>
                    <i className='fas fa-exclamation-triangle'></i> This field
                    is required
                  </p>
                )}
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                id='disable-portal2'
                options={Item}
                ref={register}
                name='Item'
                defaultValue={
                  props.type === 'update'
                    ? Item.find(Item => Item.Item_ID === props.record.Item_ID)
                    : {}
                }
                getOptionLabel={option => option.Item_Name || ''}
                onChange={(event, value) => {
                  if (value != null) setValue('Item_ID', value.Item_ID);
                }}
                style={{ marginBottom: '5px' }}
                renderInput={params => {
                  return (
                    <TextField
                      {...params}
                      label='Item'
                      name='Item'
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
              {errors.Item_ID && errors.Item_ID.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                id='standard-search'
                ref={register}
                autoComplete='off'
                fullWidth
                defaultValue={
                  props.type === 'update' ? props.record.Opening_Bal : ''
                }
                type='number'
                name='Opening_Bal'
                style={{ marginBottom: '5px' }}
                onChange={(event, value) => {
                  setValue('Opening_Bal', event.target.value);

                  setValue('Current_Bal', event.target.value);
                }}
                label='Open Balance'
              />
              {errors.Opening_Bal && errors.Opening_Bal.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                id='standard-search'
                autoComplete='off'
                fullWidth
                defaultValue={props.type === 'update' ? props.record.Rate : ''}
                type='number'
                name='Rate'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 5 })}
                label='Rate'
              />
              {errors.Rate && errors.Rate.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel id='demo-simple-select-label'>From Year</InputLabel>
              <Select
                style={{ width: 400 }}
                name='From_Year'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                ref={register}
                value={Year}
                onChange={(event, value) => {
                  setYear(event.target.value);
                  if (value != null) {
                    setValue('From_Year', event.target.value);

                    setValue('To_Year', event.target.value + 1);
                  }
                }}
                //  onChange={handleChange}
              >
                <MenuItem
                  value={
                    props.type === 'update'
                      ? props.record.From_Year
                      : new Date().getFullYear()
                  }
                >
                  {props.type === 'update'
                    ? props.record.From_Year
                    : new Date().getFullYear()}
                </MenuItem>
                <MenuItem
                  value={
                    props.type === 'update'
                      ? props.record.From_Year - 1
                      : new Date().getFullYear() - 1
                  }
                >
                  {props.type === 'update'
                    ? props.record.From_Year - 1
                    : new Date().getFullYear() - 1}
                </MenuItem>
              </Select>
              {errors.From_Year && errors.From_Year.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='standard-search'
                autoComplete='off'
                fullWidth
                name='To_Year'
                style={{ marginBottom: '5px' }}
                label='To Year'
                value={Year ? Year + 1 : ''}
              />
              {errors.To_Year && errors.To_Year.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id='disable-portal2'
                options={Branch}
                ref={register}
                name='Branch'
                defaultValue={
                  props.type === 'update'
                    ? Branch.find(
                        Branch => Branch.Branch_ID === props.record.Branch_ID
                      )
                    : {}
                }
                getOptionLabel={option => option.Branch_Name || ''}
                onChange={(event, value) => {
                  if (value != null) setValue('Branch_ID', value.Branch_ID);
                }}
                style={{ marginBottom: '5px' }}
                renderInput={params => {
                  return (
                    <TextField
                      {...params}
                      label='Branch'
                      name='Branch'
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
              {errors.Branch_ID && errors.Branch_ID.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id='disable-portal2'
                options={Location}
                ref={register}
                name='Location'
                defaultValue={
                  props.type === 'update'
                    ? Location.find(
                        Location =>
                          Location.Department_ID === props.record.Department_ID
                      )
                    : {}
                }
                getOptionLabel={option => option.Department_Name || ''}
                onChange={(event, value) => {
                  if (value != null)
                    setValue('Department_ID', value.Department_ID);
                }}
                style={{ marginBottom: '5px' }}
                renderInput={params => {
                  return (
                    <TextField
                      {...params}
                      label='Location'
                      name='Location'
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
              {errors.Department_ID &&
                errors.Department_ID.type === 'required' && (
                  <p className='form_error'>
                    <i className='fas fa-exclamation-triangle'></i> This field
                    is required
                  </p>
                )}
            </Grid>
          </Grid>
          <div>
            <Button color='primary' variant='contained' type='submit'>
              {props.type === 'insert' ? 'Register' : 'Update'}
            </Button>
          </div>
        </form>
      ) : (
        <h6>Loading</h6>
      )}
    </div>
  );
};

export default OpeningBalForm;
