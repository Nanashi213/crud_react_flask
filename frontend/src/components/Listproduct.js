import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Listporduct(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios({
        method: "GET",
        url:"http://localhost:5000/products",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
      .then((response) => {
        setProducts(response.data)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    }, 6000); // Aquí puedes cambiar el tiempo. Actualmente está configurado para hacer la consulta cada 60 segundos.
  
    return () => clearInterval(interval); // Esto es para limpiar el intervalo cuando el componente se desmonte.
  }, []);
  

  const deleteProduct = (productId) => {
    axios({
      method: "DELETE",
      url:`http://localhost:5000/products/${productId}`,
      headers: {
        Authorization: 'Bearer ' + props.token
    }
  })
  .then((response) => {
    setProducts(products.filter(product => product.id !== productId))
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
  };

  return (
    <Container>
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

export default Listporduct;