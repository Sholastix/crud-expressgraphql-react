import React, { useState, useEffect } from 'react';
import axios from 'axios';
// // Will be needed for VARIANT 2.
// import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

import { gqlGetProduct } from '../graphql/queries';

const ProductInfo = ({ match }) => {
    // VARIANT 1 - standart.
    const _id = match.params.id;

    // // VARIANT 2 - with help of ReactRouter hook.
    // const request = useParams();
    // const _id = request.id;

    const [product, setProduct] = useState();

    useEffect(() => {
        getProduct();
    }, []);

    // GET
    const getProduct = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(gqlGetProduct({
                    _id
                })),
            });

            setProduct(result.data.data.getProduct);
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div className='App container'>
            <br />
            <h1>Product Info</h1>
            <br />
            {
                product ?
                    <Table bordered striped size='sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.createdAt}</td>
                                <td>{product.updatedAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                    :
                    <div>LOADING...</div>
            }
        </div>
    );
};

export default ProductInfo;