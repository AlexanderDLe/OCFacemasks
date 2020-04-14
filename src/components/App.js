import React, { useState } from 'react';
import '../styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

const API = 'https://0n6fj67t7l.execute-api.us-west-1.amazonaws.com/dev/mail';
const header = {
    'Content-Type': 'application/json',
};

const App = () => {
    const [orders, setOrders] = useState([]);
    const [amount, setAmount] = useState(0);
    // const [shippingInfo, setShippingInfo] = useState({});

    const addOrder = (data) => {
        const newOrders = [...orders];

        // If identical mask already exist, add to the amount
        // Otherwise, we create a new separate line on order summary.
        let foundIdentical = false;
        for (let order of newOrders) {
            if (order.color === data.color && order.size === data.size) {
                order.amount = parseInt(order.amount) + parseInt(data.amount);
                foundIdentical = true;
            }
        }
        if (!foundIdentical) newOrders.push(data);

        setOrders(newOrders);
        setAmount(amount + parseInt(data.amount));
    };

    const removeOrder = (data) => {
        const newOrders = [];

        for (let order of orders) {
            if (data.color === order.color && data.size === order.size)
                continue;
            newOrders.push(order);
        }

        setOrders(newOrders);
        setAmount(amount - parseInt(data.amount));
    };

    const updateShippingInfo = (data) => {
        axios.post(API, data, header);
    };

    return (
        <div>
            <CssBaseline />
            <Navbar amount={amount} />
            <Body
                addOrder={addOrder}
                removeOrder={removeOrder}
                updateShippingInfo={updateShippingInfo}
                orders={orders}
            />
            <Footer />
        </div>
    );
};

export default App;
