import React from 'react';
import MaterialTable from 'material-table';

export const Table = props => {
  const { title, suppliers } = props;

  let columns = [
    { title: 'Supplier Name', field: 'Supplier_Name' },
    { title: 'Supplier Type', field: 'supplier_type' },
    { title: 'City', field: 'City_Name' },
    { title: 'Telephone No', field: 'Tel_NO1' },
    { title: 'Email', field: 'Email' },
    { title: 'Contact Person', field: 'Contact_Person' },
    { title: 'Enabled Flag', field: 'Enabled_Flag', type: 'boolean' }
  ];

  const [state] = React.useState({
    columns: columns,
    data: suppliers.data
  });

  return (
    <MaterialTable
      title={title}
      columns={state.columns}
      data={suppliers.data}
      options={{ pageSize: 10 }}
    />
  );
};

export default Table;
