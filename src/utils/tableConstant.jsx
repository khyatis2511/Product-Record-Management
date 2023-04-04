const tableConstant = (handleEdit, handleDelete) => [
  {
    title: 'Image',
    key: 'image',
    render: (rowData) => <span>{rowData.image}</span>,
  },
  {
    title: 'Product Name',
    key: 'productName',
    render: (rowData) => <span>{rowData.productName}</span>,
  },
  {
    title: 'Details',
    key: 'details',
    render: (rowData) => <span>{rowData.details}</span>,
  },
  {
    title: 'Price',
    key: 'price',
    render: (rowData) => <span>{rowData.price}</span>,
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render: (rowData) => <span>{rowData.quantity}</span>,
  },
  {
    title: 'Total Price',
    key: 'totalPrice',
    render: (rowData) => <span>{rowData.price * rowData.quantity}</span>,
  },
  {
    title: 'Created Date',
    key: 'createdDate',
    render: (rowData) => <span>{rowData.createdDate}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (rowData) => (
      <>
        <button type="button" id={rowData.id} onClick={(e) => handleEdit(e.target.id)}>Edit</button>
        <button type="button" id={rowData.id} onClick={(e) => handleDelete(e.target.id)}>Delete</button>
      </>
    ),
  },
];

export default tableConstant;
