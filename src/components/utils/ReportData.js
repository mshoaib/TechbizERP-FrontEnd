import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  heading: {
    display: 'flex',
    fontSize: 30,
    textAlign: 'center'
  },
  mainDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,

    color: 'grey'
  },
  mainDetailsItem: {
    width: 130,
    textAlign: 'center',
    fontSize: 13
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    color: 'black',
    backgroundColor: '#D3D3D3',

    borderBottomStyle: 'solid',
    borderBottomWidth: 4,

    borderBottomColor: 'black',

    padding: 5
  },
  tableHeadItem: {
    fontSize: 12,
    display: 'flex',
    width: 60,
    marginRight: 5,
    textAlign: 'center'
  },
  tableHeadPOItem: {
    fontSize: 15,
    display: 'flex',
    width: 300,
    marginRight: 5,
    textAlign: 'center'
  },
  tableBodyPOItem: {
    fontSize: 13,
    display: 'flex',
    width: 300,
    marginRight: 5,
    textAlign: 'center'
  },
  tableBodyItem: {
    fontSize: 9,
    display: 'flex',
    width: 60,
    marginRight: 5,
    textAlign: 'center'
  },
  tableBody: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  }
});

export const ReportData = props => {
  const { filter, data, title, header, orientation } = props;
  let Body;
  let Filter;
  let total = 0;

  if (data.data) {
    Body = data.data.map((data, index) => (
      <View key={index} style={styles.tableBody}>
        {title === 'Item List' && (
          <Fragment>
            <Text style={styles.tableBodyItem}>{data.Item_Code}</Text>
            <Text style={styles.tableBodyItem}>{data.Item_Name}</Text>
            <Text style={styles.tableBodyItem}>{data.SubCat}</Text>
            <Text style={styles.tableBodyItem}>{data.UOM}</Text>
            <Text style={styles.tableBodyItem}>
              {data.COItem === 1 ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.tableBodyItem}>
              {data.InvItem === 1 ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.tableBodyItem}>
              {data.SOItem === 1 ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.tableBodyItem}>
              {data.PItem === 1 ? 'Yes' : 'No'}
            </Text>
          </Fragment>
        )}
        {title === 'Purchase Order' && (
          <Fragment>
            <Text style={styles.tableBodyPOItem}>{data.item_Code}</Text>
            <Text style={styles.tableBodyPOItem}>{data.item_name}</Text>
            <Text style={styles.tableBodyPOItem}>{data.UOM_Name}</Text>
            <Text style={styles.tableBodyPOItem}>{data.Item_Qty}</Text>
            <Text style={styles.tableBodyPOItem}>${data.price}</Text>
            <Text style={styles.tableBodyPOItem}>{data.GST_Per}%</Text>
            <Text style={styles.tableBodyPOItem}>${data.GST_Amt}</Text>

            <Text style={styles.tableBodyPOItem}>${data.Total_Amt}</Text>
            {
              <Text style={{ opacity: 0, width: 1 }}>
                {(total += data.Total_Amt)}
              </Text>
            }
          </Fragment>
        )}
        {title === 'Supplier List' && (
          <Fragment>
            <Text style={styles.tableBodyItem}>{data.Supplier_Name}</Text>
            <Text style={styles.tableBodyItem}>{data.supplier_type}</Text>
            <Text style={styles.tableBodyItem}>{data.Address}</Text>
            <Text style={styles.tableBodyItem}>{data.City_Name}</Text>
            <Text style={styles.tableBodyItem}>{data.Tel_NO1}</Text>
            <Text style={styles.tableBodyItem}>{data.Email}</Text>
            <Text style={styles.tableBodyItem}>{data.NTN_NO}</Text>
            <Text style={styles.tableBodyItem}>{data.Sales_Tax_NO}</Text>
          </Fragment>
        )}
      </View>
    ));
  }

  if (filter) {
    if (title === 'Supplier List') {
      Filter = (
        <Fragment>
          <View style={styles.mainDetails}>
            {filter.type !== 'null' && (
              <Text style={{ width: 160, textAlign: 'center', fontSize: 13 }}>
                <Text style={{ color: 'black' }}>Supplier Type: </Text>
                {filter.type}
              </Text>
            )}
            {filter.city !== 'null' && (
              <Text style={{ width: 160, textAlign: 'center', fontSize: 13 }}>
                <Text style={{ color: 'black' }}>City: </Text>
                {filter.city}
              </Text>
            )}
          </View>
        </Fragment>
      );
    } else if (title === 'Purchase Order') {
      Filter = (
        <Fragment>
          <View style={styles.mainDetails}>
            {filter.Invoice_Number !== 'null' && (
              <Text style={{ width: 420, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>PO NUMBER: </Text>
                {filter.Invoice_Number}
              </Text>
            )}
            {filter.Creation_Date !== 'null' && (
              <Text style={{ width: 300, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>PO DATE: </Text>
                {filter.Creation_Date}
              </Text>
            )}
            {filter.Supplier !== 'null' && (
              <Text style={{ width: 300, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>Supplier Name: {'  '} </Text>
                {filter.Supplier}
              </Text>
            )}
          </View>
          <View style={styles.mainDetails}>
            {filter.Creation_Date !== 'null' && (
              <Text style={{ width: 420, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>Delivery location: </Text>
                {filter.Delivery}
              </Text>
            )}
            {filter.Payment_Type !== 'null' && (
              <Text style={{ width: 300, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>PAYMENT TYPE: </Text>
                {filter.Payment_Type}
              </Text>
            )}
            {filter.RefNo !== 'null' && (
              <Text style={{ width: 300, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>Ref No: </Text>
                {filter.RefNo}
              </Text>
            )}
          </View>
          <View style={styles.mainDetails}>
            {filter.Creation_Date !== 'null' && (
              <Text style={{ width: 320, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>Status: </Text>
                {filter.Status}
              </Text>
            )}
            {filter.Payment_Type !== 'null' && (
              <Text style={{ width: 300, textAlign: 'left', fontSize: 11 }}>
                <Text style={{ color: 'black' }}>Enabled Flag: </Text>
                {filter.Flag}
              </Text>
            )}
          </View>
        </Fragment>
      );
    } else if (title === 'Item List') {
      Filter = (
        <Fragment>
          <View style={styles.mainDetails}>
            {filter.subCategory !== 'null' && (
              <Text style={styles.mainDetailsItem}>
                <Text style={{ color: 'black' }}>Sub Category: </Text>
                {filter.subCategory}
              </Text>
            )}
            {filter.isPurchasable !== 'null' && (
              <Text style={styles.mainDetailsItem}>
                <Text style={{ color: 'black' }}>Purchasable Item: </Text>
                {filter.isPurchasable === 'Y' ? 'Yes' : 'No'}
              </Text>
            )}
            {filter.isInventoryItem !== 'null' && (
              <Text style={styles.mainDetailsItem}>
                <Text style={{ color: 'black' }}> Inventory Item: </Text>
                {filter.isInventoryItem === 'Y' ? 'Yes' : 'No'}
              </Text>
            )}
            {filter.isSalesItem !== 'null' && (
              <Text style={styles.mainDetailsItem}>
                <Text style={{ color: 'black' }}>Sales Order Item: </Text>
                {filter.isSalesItem === 'Y' ? 'Yes' : 'No'}
              </Text>
            )}
          </View>
        </Fragment>
      );
    }
  }

  return (
    <Document>
      <Page size='A4' orientation={orientation} style={styles.body}>
        <View style={styles.heading}>
          <Text>{title} </Text>
        </View>

        {Filter}

        <View style={styles.tableHead}>
          {header &&
            header !== null &&
            header.map((head, index) => (
              <Text
                key={index}
                style={
                  title === 'Purchase Order'
                    ? styles.tableHeadPOItem
                    : styles.tableHeadItem
                }
              >
                {head}
              </Text>
            ))}
        </View>
        {Body}
        {total !== 0 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginRight: 5,
              fontSize: 14
            }}
          >
            <Text
              style={{
                color: 'blue'
              }}
            >
              INVOICE TOTAL:{' '}
            </Text>
            <Text> ${total}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
