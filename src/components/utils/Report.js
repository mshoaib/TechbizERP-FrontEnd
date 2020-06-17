import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { PDFViewer } from '@react-pdf/renderer';
import qs from 'query-string';

import { ReportData } from './ReportData';

export const Report = ({ location, match }) => {
  let Headers = [];
  let title = '';
  let filter = {};
  let URL = ``;
  let orientation = 'portrait';

  const query = qs.parse(location.search);

  if (query.title === 'Item') {
    Headers = [
      'Item Code',
      'Item Name',
      'Sub Category',
      'UOM',
      'C/O Item',
      'Inventory Item',
      'S/O Item',
      'P Item'
    ];
    title = 'Item List';
    filter.subCategory = query.subCategory;
    filter.isSalesItem = query.isSalesItem;
    filter.isInventoryItem = query.isInventoryItem;
    filter.isPurchasable = query.isPurchasable;

    const { subCategory, isSalesItem, isInventoryItem, isPurchasable } = filter;

    URL = `http://localhost:5000/api/inv/items/?${
      subCategory === 'null' ? null : `subCategory=${subCategory}`
    }&${isPurchasable === 'null' ? null : `purchasableItem=${isPurchasable}`} 
        &${isSalesItem === 'null' ? null : `SalesOrderItem=${isSalesItem}`} 
        &${
          isInventoryItem === 'null' ? null : `InventoryItem=${isInventoryItem}`
        }
        `;
  } else if (query.title === 'Supplier') {
    Headers = [
      'Spplier Name',
      'Supplier Type',
      'Address',
      'City',
      'Tel',
      'Email',
      'NTN NO',
      'Sales Tax'
    ];
    title = 'Supplier List';
    filter.type = query.type;
    filter.city = query.city;

    const { type, city } = filter;
    URL = `http://localhost:5000/api/pms/suppliers/?${
      type === 'null' ? null : `type=${type}`
    }&${city === 'null' ? null : `city=${city}`}`;
  } else if (query.title == 'PurchaseOrder') {
    Headers = [
      'Item Code',
      'Item Name',
      'UOM',
      'Quantity',
      'Price',
      'GST %',
      'GST Amount',
      'Total Amount'
    ];
    title = 'Purchase Order';
    filter.Invoice_Number = query.Invoice_Number;
    filter.Creation_Date = query.Creation_Date;
    filter.Payment_Type = query.Payment_Type;
    filter.Supplier = query.Supplier;
    filter.Delivery = query.Delivery;
    filter.RefNo = query.RefNo;
    filter.Status = query.Status;
    filter.Flag = query.Flag;
    orientation = 'landscape';
    URL = `http://localhost:5000/api/pms/invoice/${query.Header_ID}`;
  }
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      let response = await await axios(URL);
      let invoice = await response.data;

      setData(invoice);
      console.log(data);
    } catch (err) {}
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <PDFViewer className='pdf'>
      <ReportData
        data={data}
        title={title}
        filter={filter}
        header={Headers}
        orientation={orientation}
      />
    </PDFViewer>
  );
};
