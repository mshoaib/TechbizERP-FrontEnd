import React, { useState, Fragment } from 'react';

import Item from './items/Item';
import InvTable from './InvTable';

const InvReport = () => {
  const [item, setitem] = useState(false);
  const [table, setTable] = useState(true);
  const invHandler = event => {
    setitem(true);
    setTable(false);
  };
  const onClickBack = () => {
    setitem(false);
    setTable(true);
  };

  return (
    <div style={{ paddingTop: 20, paddingLeft: 20 }}>
      {table && <InvTable invHandler={invHandler} />}
      {item && <Item onClickBack={onClickBack} />}
    </div>
  );
};

export default InvReport;
