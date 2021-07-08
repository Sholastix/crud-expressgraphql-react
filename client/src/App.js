import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import './App.css';

import { gqlGetProducts, gqlGetProduct, gqlAddProduct, gqlUpdateProduct, gqlDeleteProduct } from './graphql/queries';

const App = () => {

    /////////////////////////////////// STATE SETTINGS ////////////////////////////////

    const [products, setProducts] = useState([]);

    const [createProductName, setCreateProductName] = useState('');
    const [createProductPrice, setCreateProductPrice] = useState('');

    const [editProductId, setEditProductId] = useState('');
    const [editProductName, setEditProductName] = useState('');
    const [editProductPrice, setEditProductPrice] = useState('');

    const [createProductModal, setCreateProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const toggleCreateProductModal = () => setCreateProductModal(!createProductModal);
    const toggleEditProductModal = () => setEditProductModal(!editProductModal);

    /////////////////////////////////// GraphQL REQUESTS ////////////////////////////////

    // GET
    const getProducts = async () => {
        try {
            // VARIANT 1 - AXIOS.
            const productsList = await axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(gqlGetProducts()),
            });

            setProducts(productsList.data.data.getProducts);

            // // VARIANT 2 - FETCH.
            // const productsList = await fetch('http://localhost:5000/graphql', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(gqlGetProducts()),
            // });
            // const result = await productsList.json();

            // setProducts(result.data.getProducts);
        } catch (err) {
            console.error(err);
        };
    };

    // POST
    const addProductHandler = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(gqlAddProduct({
                    name: createProductName,
                    price: createProductPrice,
                })),
            });

            const newProduct = result.data.data.createProduct;
            const updProducts = [...products, { ...newProduct }];

            setProducts(updProducts);
            toggleCreateProductModal();
            getProducts();
        } catch (err) {
            console.error(err);
        };
    };

    // EDIT
    const updateProductHandler = async (_id) => {
        try {
            // // VARIANT 1 - short but with unneсessary additional request.
            // await axios({
            //     method: 'POST',
            //     url: 'http://localhost:5000/graphql',
            //     headers: { 'Content-Type': 'application/json' },
            //     data: JSON.stringify(gqlUpdateProduct({
            //         _id: editProductId,
            //         name: editProductName,
            //         price: editProductPrice,
            //     })),
            // });

            // toggleEditProductModal();
            // getProducts();

            // VARIANT 2.
            const result = await axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(gqlUpdateProduct({
                    _id: editProductId,
                    name: editProductName,
                    price: editProductPrice,
                })),
            });

            const updElement = result.data.data.updateProduct;
            const index = products.findIndex((el) => el._id === editProductId);

            const updProducts = [
                ...products.slice(0, index),
                updElement,
                ...products.slice(index + 1)
            ];

            setProducts(updProducts);
            toggleEditProductModal();
        } catch (err) {
            console.error(err);
        };
    };

    const editProductHandler = async (_id) => {
        try {
            const product = products.find((el) => el._id === _id);
            setEditProductId(_id);
            setEditProductName(product.name);
            setEditProductPrice(product.price);
            toggleEditProductModal();
        } catch (err) {
            console.error(err);
        };
    };

    // DELETE
    const deleteProductHandler = async (_id) => {
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(gqlDeleteProduct({
                    _id
                })),
            });

            const index = products.findIndex((el) => el._id === _id);
            const updProducts = [
                ...products.slice(0, index),
                ...products.slice(index + 1),
            ];

            setProducts(updProducts);
        } catch (err) {
            console.error(err);
        };
    };

    /////////////////////////////////// RENDERING ////////////////////////////////

    return (
        <div className='App container'>
            <br />
            <h1>List of Products</h1>
            <br />
            <Button color='success' outline onClick={toggleCreateProductModal}>ADD NEW PRODUCT</Button>
            <br />
            <br />
            <Modal isOpen={createProductModal} toggle={toggleCreateProductModal}>
                <ModalHeader toggle={toggleCreateProductModal}>Please add a new product:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name'
                                placeholder='ex. AMD Ryzen 5 3600'
                                value={createProductName}
                                onChange={(event) => { setCreateProductName(event.target.value) }} />
                            <br />
                            <Label for='price'>Price:</Label>
                            <Input id='price'
                                placeholder='ex. 5000.00'
                                value={createProductPrice}
                                onChange={(event) => { setCreateProductPrice(event.target.value) }} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={addProductHandler}>ADD</Button>{' '}
                    <Button color='secondary' onClick={toggleCreateProductModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editProductModal} toggle={toggleEditProductModal}>
                <ModalHeader toggle={toggleEditProductModal}>Edit product info:</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Name:</Label>
                            <Input id='name'
                                value={editProductName}
                                onChange={(event) => { setEditProductName(event.target.value) }} />
                            <br />
                            <Label for='price'>Price:</Label>
                            <Input id='price'
                                value={editProductPrice}
                                onChange={(event) => { setEditProductPrice(event.target.value) }} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={updateProductHandler}>UPDATE</Button>{' '}
                    <Button color='secondary' onClick={toggleEditProductModal}>CANCEL</Button>
                </ModalFooter>
            </Modal>

            <Table bordered striped size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button color='secondary' size='sm' className='mr-2' outline onClick={() => { editProductHandler(product._id) }}>EDIT</Button>{' '}
                                <Button color='danger' size='sm' outline onClick={() => { deleteProductHandler(product._id) }}>DELETE</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default App;