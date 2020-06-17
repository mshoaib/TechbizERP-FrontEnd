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
import ReactTable from 'react-table-6';
import { OnMessage } from '../../misc/message';

const PurRecForm = props => {
  const { Organization_ID, User_ID } = useSelector(state => state.user);
  const [tdata, settdata] = useState();

  const { register, errors, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      Supplier_Type: props.type === 'update' ? props.record.Supplier_Type : '',
      Supplier_ID: props.type === 'update' ? props.record.Supplier_ID : '',
      PO_Header_ID: props.type === 'update' ? props.record.PO_Header_ID : '',
      City_ID: props.type === 'update' ? props.record.City_ID : '',
      Country_ID: props.type === 'update' ? props.record.Country_ID : ''
    }
  });

  const [SupplierType, setSupplierType] = useState([]);
  const [Supplier, setSupplier] = useState([]);
  const [PoNo, setPoNo] = useState([]);
  const [ready, setReady] = useState(false);
  const currentDate = moment();
  const prDate = currentDate.format('DD-MM-YYYY');
  const watchValues = watch();

  const [record, setRecord] = useState();
  const deleteApiPath = '/pms/delete-supplier/';
  //const {Organization_ID} = useSelector(state =>state.user);

  // Line Level Start

  const onDelete = item => {
    {
      console.log(item);
      swal({
        title: '',
        text: 'Do you want to delete this record ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            API.delete(`${deleteApiPath}${item}`, {
              header: {
                'Content-Type': 'ic/json'
              }
            }).then(function (response) {
              console.log(response);
              OnMessage('Record has been deleted', 'success');
              getData();
            });
          } else {
          }
        })
        .then(value => {
          getData();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  console.log('props record :', props.record);

  const columns = [
    {
      Header: 'Item',
      accessor: 'Item_Name',
      sortable: false,
      filterable: false
    },
    {
      Header: 'UOM',
      accessor: 'UOM_Name',
      sortable: false,
      filterable: false
    },
    {
      Header: 'Qty',
      accessor: 'Qty',
      sortable: false,
      filterable: false
    },
    {
      Header: 'Price',
      accessor: 'Price',
      sortable: false,
      filterable: false
    },
    {
      Header: 'GST %',
      accessor: 'GST_Per',
      sortable: false,
      filterable: false
    },
    {
      Header: 'GST Amt',
      accessor: 'GST_Amt',
      sortable: false,
      filterable: false
    },

    {
      Header: 'Total Amt',
      accessor: 'Total_Amt',
      sortable: false,
      filterable: false
    },
    {
      Header: 'Actions',
      Cell: props => {
        return (
          <div style={{ textAlign: 'center' }}>
            <i
              className='fas fa-trash'
              style={{
                color: '#dc3545',
                fontSize: '1.2rem',
                margin: '0px 15px'
              }}
              onClick={() =>
                //console.log(props.original.UOM_ID)
                onDelete(props.original.Supplier_ID)
              }
            ></i>
          </div>
        );
      },
      sortable: true,
      filterable: false
    }
  ];

  const getData = () => {
    API.get(`/pms/purchaseRece/get-line/${props.record.PR_Header_ID}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Line data : ', response.data);
        if (response.data !== tdata) {
          settdata(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //  ************ Populate PO Header Line *****************

  const popLine = () => {
    API.get(`/pms/purchaseRece/populate-polline/${watchValues.PO_Header_ID}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Line data : ', response.data);
        if (response.data !== tdata) {
          settdata(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log('props type : ', props.type);

  useEffect(() => {
    // ReactModal.setAppElement('body')
    if (props.type === 'update') {
      getData();
    }
  }, []); // eslint-disable-line

  const populateLine = () => {
    console.log('Populate Line');
    popLine();
  };

  // Line Level End

  console.log('current date : ', currentDate.format('DD-MM-YYYY'));

  useEffect(() => {
    console.log('watch vaues :', watchValues);
  });

  useEffect(() => {
    register({ name: 'Supplier_ID' }, { required: true });
    register({ name: 'PO_Header_ID' }, { required: true });
    register({ name: 'Country_ID' }, { required: true });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (Supplier.length === 0) {
      axios
        .all([
          API.get(`/pms/purchaseOrder/supplier/${Organization_ID}`),
          API.get(`/pms/lov/get-po_no-lov/${Organization_ID}`),
          // API.get("/pms/lov/get-supplierType-lov"),
          API.get('/pms/lov/get-country-lov')
        ])
        .then(
          axios.spread((url1, url2, url3) => {
            setSupplier(url1.data);
            setPoNo(url2.data);
            //       setCountry(url3.data)

            // console.log(url3.data);
            console.log('Purchase Order No : ', PoNo.filter);
            setReady(true);
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  }, [Supplier]); // eslint-disable-line

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
      Branch_ID: '',
      Organization_ID: 1, // Replace
      Enabled_Flag: data.Enabled_Flag === true ? 'Y' : 'N',
      Created_By: User_ID,
      Creation_Date: currentDate.format('YYYY-MM-DD'),
      Last_Updated_By: User_ID
      // Last_Updated_Date: currentDate.format("YYYY-MM-DD HH:mm:ss"),
    };

    API.post('/pms/create-supplier', data, {
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
        if (
          error.response.status === 400 ||
          error.response.status === 403 ||
          error.response.status === 404
        ) {
          swal('Entry Failed!', error.message, 'error');
        }
      });
  };

  //  console.log(props.record);

  /* UPDATE FORM FUNCTION */
  const OnUpdate = data => {
    const { Supplier_ID, Supplier_Name } = props.record;
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
      Enabled_Flag: data.Enabled_Flag === true ? 'Y' : 'N',
      Created_By: User_ID,
      Last_Updated_By: User_ID, // temp Changed With User_ID
      // Last_Updated_Date: currentDate.format('YYYY-MM-DD HH:mm:ss'),
      Organization_ID: 1
    };

    console.log('data ---- > ', data);
    API.put(`pms/update-supplier/${Supplier_ID}`, data, {
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
        if (
          error.response.status === 400 ||
          error.response.status === 403 ||
          error.response.status === 404
        ) {
          swal(`Entry Failed!`, error.message, 'error');
        }
      });
  };

  return (
    <div style={{ margin: '0 10px' }}>
      {ready ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '100%' }}>
          <p style={{ color: '#113C87' }} className='h5 text-left py-1'>
            {' '}
            Purchase Receiavble{' '}
          </p>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id='standard-search'
                autoComplete='off'
                fullWidth
                defaultValue={props.type === 'update' ? props.record.PR_NO : ''}
                type='search'
                name='PR_NO'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 255 })}
                label='PR_NO'
              />
              {errors.PR_NO && errors.PR_NO.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
              {errors.PR_NO && errors.PR_NO.type === 'maxLength' && (
                <p className='form_error'> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id='standard-search'
                autoComplete='off'
                fullWidth
                defaultValue={
                  props.type === 'update' ? props.record.PR_Date : prDate
                }
                type='search'
                name='PR_Date'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 255 })}
                label='PR_Date'
              />
              {errors.PR_Date && errors.PR_Date.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
              {errors.PR_Date && errors.PR_Date.type === 'maxLength' && (
                <p className='form_error'> Maximum Length Allowed is 250 </p>
              )}
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id='Supplier_ID'
                options={Supplier}
                ref={register}
                name='Supplier_ID'
                defaultValue={
                  props.type === 'update'
                    ? Supplier.find(
                        Supplier =>
                          Supplier.Supplier_ID === props.record.Supplier_ID
                      )
                    : {}
                }
                getOptionLabel={option => option.Supplier_Name || ''}
                onChange={(event, value) => {
                  if (value != null) setValue('Supplier_ID', value.Supplier_ID);
                }}
                style={{ marginBottom: '5px' }}
                renderInput={params => {
                  return (
                    <TextField
                      {...params}
                      label='Supplier'
                      name='Supplier_ID'
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id='PO_Header_ID'
                options={PoNo}
                ref={register}
                name='PO_Header_ID'
                defaultValue={
                  props.type === 'update'
                    ? PoNo.find(
                        PoNo => PoNo.PO_Header_ID === props.record.PO_Header_ID
                      )
                    : {}
                }
                getOptionLabel={option => option.PO_NO || ''}
                onChange={(event, value) => {
                  if (value != null)
                    setValue('PO_Header_ID', value.PO_Header_ID);
                }}
                style={{ marginBottom: '5px' }}
                renderInput={params => {
                  return (
                    <TextField
                      {...params}
                      label='PO NO'
                      name='PO_Header_ID'
                      fullWidth
                      value={params}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id='Remarks'
                autoComplete='off'
                fullWidth
                defaultValue={
                  props.type === 'update' ? props.record.Remarks : ''
                }
                type='search'
                name='Remarks'
                style={{ marginBottom: '5px' }}
                inputRef={register({ required: true, maxLength: 255 })}
                label='Remarks'
              />
              {errors.Remarks && errors.Remarks.type === 'required' && (
                <p className='form_error'>
                  <i className='fas fa-exclamation-triangle'></i> This field is
                  required
                </p>
              )}
              {errors.Remarks && errors.Remarks.type === 'maxLength' && (
                <p className='form_error'> Maximum Length Allowed is 250 </p>
              )}
            </Grid>
            <div>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                onClick={populateLine}
                disabled={props.type === 'update' ? true : false}
              >
                {props.type === 'insert' ? 'Populate' : 'Populate'}
              </Button>
            </div>

            {/* React Table */}
            <Grid item xs={12}>
              <ReactTable
                data={tdata}
                columns={columns}
                noDataText={'Loading...'}
                showPagination={true}
                defaultPageSize={10}
                sortable={false}
                filterable={false}
                className='-striped'
                getTheadThProps={() => ({
                  style: {
                    background: '#5F80B9',
                    color: '#ffffff',
                    tabindex: -1
                  }
                })}
              />
            </Grid>
          </Grid>
          <div>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              onClick=''
            >
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

export default PurRecForm;
