import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    axios.post('http://localhost:5000/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => setProducts([...products, res.data]))
    .catch(err => console.error(err));
  };

  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:5000/products/${productId}`)
      .then(() => setProducts(products.filter(product => product.id !== productId)))
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><img src={`http://localhost:5000/images/${product.image}`} alt={product.name} width={100} /></td>
              <td><Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;

{/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const addProduct = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/products', { name, price, description })
            .then(res => setProducts([...products, res.data]))
            .catch(err => console.error(err));
    };


    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:5000/products/${productId}`)
            .then(() => setProducts(products.filter(product => product.id !== productId)))
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td><Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default App;  */ }
