import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
// import imageToBase64 from 'image-to-base64/browser';
import tableConstant from '../utils/tableConstant';
import InputBox from '../View/InputBox';
import Portal from '../View/Portal';
import Table from '../View/Table';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [data, setData] = useState([]);

  const [productName, setProductName] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [editId, setEditId] = useState('');

  const [productErrorObj, setProductErrorObj] = useState({});
  const [productIdToDelete, setProductIdToDelete] = useState(0);
  const [isModalEditable, setIsModalEditable] = useState(false);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('product_data')) || []);
  }, []);

  const clearProductData = () => {
    setProductName('');
    setPrice('');
    setDetails('');
    setCreatedDate('');
    setQuantity('');
  };

  const onChangeImage = (path) => {
    console.log(path);
    const base64Image = '';
    // imageToBase64(path) // Path to the image
    //   .then((response) => {
    //     console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
    //   })
    //   .catch((error) => {
    //     console.log(error); // Logs an error if there was one
    //   });
  };

  const onClickEdit = (id) => {
    setIsModalEditable(true);
    setShowModal(true);
    setEditId(id);
    const productData = data.filter((product) => product.id === id);
    const product = productData[0];
    setProductName(product.productName);
    setPrice(product.price);
    setDetails(product.details);
    setCreatedDate(product.createdDate);
    setQuantity(product.quantity);
  };

  const onClickShowPrompt = (id) => {
    setShowPrompt(true);
    setProductIdToDelete(id);
  };

  const onClickDelete = () => {
    const productData = data.filter((product) => product.id !== productIdToDelete);
    localStorage.setItem('product_data', JSON.stringify(productData));
    setData(productData);
    setShowPrompt(false);
  };

  const onClickSave = () => {
    if (isModalEditable && editId) {
      const productData = JSON.parse(localStorage.getItem('product_data')) || [];
      const updatedProductData = productData.map((product) => {
        if (product.id === editId) {
          return {
            id: editId, productName, details, price, quantity, createdDate,
          };
        }
        return product;
      });
      localStorage.setItem('product_data', JSON.stringify(updatedProductData));
      setData(updatedProductData);
      setEditId('');
    } else {
      const obj = {
        id: nanoid(), productName, details, price, quantity, createdDate,
      };
      const productData = JSON.parse(localStorage.getItem('product_data')) || [];
      productData.push(obj);
      localStorage.setItem('product_data', JSON.stringify(productData));
      setData(productData);
    }
    setShowModal(false);
    clearProductData();
  };

  const onClickCancel = () => {
    setShowModal(false);
    clearProductData();
    setEditId('');
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowModal(true);
          clearProductData();
          setIsModalEditable(false);
        }}
      >
        ADD PRODUCT
      </button>
      <Table
        data={data}
        cols={tableConstant(onClickEdit, onClickShowPrompt)}
      />
      {showModal && (
      <Portal>
        <h1>{isModalEditable ? 'UPDATE PRODUCT' : 'ADD PRODUCT' }</h1>
        <div>
          <InputBox
            id="image"
            fieldName="Image"
            errorMsg={productErrorObj.imageError}
          >
            <input
              type="file"
              id="image"
              // value="image"
              onChange={(e) => onChangeImage(e.target.value)}
              required
            />
          </InputBox>
          <InputBox
            id="productName"
            fieldName="Product Name"
            errorMsg={productErrorObj.productNameError}
          >
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </InputBox>
          <InputBox
            id="details"
            fieldName="Details"
            errorMsg={productErrorObj.detailsError}
          >
            <textarea
              type="text"
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="3"
              required
            >
              {details}
            </textarea>
          </InputBox>
          <InputBox
            id="price"
            fieldName="Price"
            errorMsg={productErrorObj.priceError}
          >
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </InputBox>
          <InputBox
            id="quantity"
            fieldName="Quantity"
            errorMsg={productErrorObj.quantityError}
          >
            <input
              type="number"
              min={0}
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </InputBox>
          <InputBox
            id="totalPrice"
            fieldName="Total Price"
          >
            <input
              type="text"
              id="totalPrice"
              disabled
              value={price * quantity || 0}
              required
            />
          </InputBox>
          <InputBox
            id="createdDate"
            fieldName="created Date"
            errorMsg={productErrorObj.createdDateError}
          >
            <input
              type="date"
              id="createdDate"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              required
            />
          </InputBox>
          <button type="button" onClick={onClickSave}>
            { isModalEditable ? 'UPDATE' : 'SAVE' }
          </button>
          <button type="button" onClick={onClickCancel}>
            CANCEL
          </button>
        </div>
      </Portal>
      )}
      {showPrompt && (
      <Portal>
        <div>
          <p>Are you sure?</p>
          <p>Do you really want to remove this?</p>
          <button type="button" onClick={onClickDelete}>
            DELETE
          </button>
          <button
            type="button"
            onClick={() => {
              setProductIdToDelete(0);
              setShowPrompt(false);
            }}
          >
            CANCEL
          </button>
        </div>
      </Portal>
      )}
    </div>
  );
};

export default Home;
