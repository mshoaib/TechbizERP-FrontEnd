import React, { useState, useEffect } from 'react';
import API from '../../../baseURL';
import ReactTable from 'react-table-6';
import ReactModal from 'react-modal';
import ApplicationForm from './OpeningBalForm';
import Button from '@material-ui/core/Button';
import 'react-table-6/react-table.css';
import { OnDeleteMessage } from '../../misc/message';
import { OnMessage } from '../../misc/message';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const OpeningBalSearchPG = () => {
  const [tdata, settdata] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [record, setRecord] = useState();
  const deleteApiPath = '/inv/delete-opening-bal/';
  const { Organization_ID } = useSelector(state => state.user);

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

  const columns = [
    {
      Header: 'Opening Doc no',
      accessor: 'Document_No',
      sortable: true,
      filterable: true
    },
    {
      Header: 'Item',
      accessor: 'Item_Name',
      sortable: true,
      filterable: true
    },
    {
      Header: 'From Year',
      accessor: 'From_Year',
      sortable: true,
      filterable: true
    },
    {
      Header: 'To Year',
      accessor: 'To_Year',
      sortable: true,
      filterable: true
    },
    {
      Header: 'Brach',
      accessor: 'Branch_Name',
      sortable: true,
      filterable: true
    },
    {
      Header: 'Location',
      accessor: 'Department_Name',
      sortable: true,
      filterable: true
    },

    {
      Header: 'Open Bal',
      accessor: 'Opening_Bal',
      sortable: true,
      filterable: false
    },
    {
      Header: 'Current Bal',
      accessor: 'Current_Bal',
      sortable: true,
      filterable: false
    },
    {
      Header: 'Rate',
      accessor: 'Rate',
      sortable: true,
      filterable: false
    },
    {
      Header: 'Actions',
      Cell: props => {
        return (
          <div style={{ textAlign: 'center' }}>
            <i
              className='fas fa-edit'
              style={{
                color: '#007bff',
                fontSize: '1.2rem',
                margin: '0px 15px'
              }}
              onClick={() => {
                setRecord(props.original);
                setShowModalUpdate(true);
              }}
            ></i>
            <i
              className='fas fa-trash'
              style={{
                color: '#dc3545',
                fontSize: '1.2rem',
                margin: '0px 15px'
              }}
              onClick={() =>
                //console.log(props.original.UOM_ID)
                onDelete(props.original.Header_ID)
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
    API.get(`/inv/get-opening-bal/${Organization_ID}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // console.log(responce.data);
        if (response.data !== tdata) {
          settdata(response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    ReactModal.setAppElement('body');
    getData();
  }, []); // eslint-disable-line

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: '-40%',
      width: '90%',
      transform: 'translate(-50%, -50%)'
    }
  };

  return (
    <div>
      {/* <h4 style={{marginTop:"3px",color:"#113C87",fontWeight:"bold" }} >Unit of Measurement</h4> */}
      <div style={{ marginLeft: '2%', marginTop: '5px' }}>
        <p style={{ color: '#113C87' }} className='h5 text-left py-1'>
          Opening Balance
        </p>
      </div>

      <div style={{ marginLeft: '90%', marginBottom: '2px' }}>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => setShowModalInsert(true)}
        >
          <i className='fas fa-plus' style={{ marginRight: '5px' }}></i>
          Create
        </Button>
      </div>

      {/* React Table */}
      <ReactTable
        data={tdata}
        columns={columns}
        noDataText={'Loading...'}
        showPagination={true}
        defaultPageSize={10}
        sortable={true}
        filterable={true}
        className='-striped'
        getTheadThProps={() => ({
          style: { background: '#5F80B9', color: '#ffffff', tabindex: -1 }
        })}
      />

      {/* Modal for Update */}
      <ReactModal
        isOpen={showModalUpdate}
        onRequestClose={() => {
          setShowModalUpdate(false);
          setRecord(null);
          getData();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className='fas fa-times'
            style={{
              color: '#007bff',
              fontSize: '1.2rem',
              margin: '0px 15px',
              marginLeft: '96%'
            }}
            onClick={() => setShowModalUpdate(false)}
          ></i>
          <ApplicationForm
            type='update'
            record={record}
            onClose={setShowModalUpdate}
            getData={getData}
          />
        </div>
      </ReactModal>

      {/* Modal for Insert */}
      <ReactModal
        isOpen={showModalInsert}
        onRequestClose={() => {
          setShowModalInsert(false);
          getData();
        }}
        style={customStyles}
        ariaHideApp={true}
      >
        <div>
          <i
            className='fas fa-times'
            style={{
              color: '#007bff',
              fontSize: '1.2rem',
              margin: '0px 15px',
              marginLeft: '96%'
            }}
            onClick={() => setShowModalInsert(false)}
          ></i>
          <ApplicationForm
            type='insert'
            onClose={setShowModalInsert}
            getData={getData}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default OpeningBalSearchPG;
