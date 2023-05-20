import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormProduct(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    axios({
      method: "POST",
      url:"http://localhost:5000/products",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + props.token,
        }})
    .then(res => setProducts([...products, res.data]))
    .catch(err => console.error(err));
  };


  return (
    <Container>
      <Form onSubmit={addProduct}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control type="text" placeholder="Enter product price" onChange={e => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control type="text" placeholder="Enter product description" onChange={e => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default FormProduct;