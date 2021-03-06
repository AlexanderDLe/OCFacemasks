import React, { useEffect, useState, Suspense, lazy } from 'react';
import '../styles/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactPixel from 'react-facebook-pixel';
import Body from './Body';
import keys from '../config/keys';
import ReactPinterestTag from 'react-pinterest-tag';

const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));
const Snackbar = lazy(() => import('./Snackbar'));

const options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
};

const testOrder = [
    {
        type: 'Mask',
        color: 'Black Test',
        param: 'black',
        price: 12.5,
        img: 'Black.jpg',
        size: 'L',
        amount: '1',
    },
    {
        type: 'Mask',
        color: 'White Test',
        param: 'white',
        price: 12.5,
        img: 'White.jpg',
        size: 'M',
        amount: '2',
    },
];

const defaultShowMoreObject = {
    Bandana: true,
    Floral: true,
    Animal: true,
    Pattern: true,
    Solid: true,
    Hawaiian: true,
    Patriot: true,
    Shield: true,
};

const App = () => {
    const mode = 'production';
    const [orders, setOrders] = useState(
        mode === 'production' ? [] : testOrder
    );
    const [amount, setAmount] = useState(mode === 'production' ? 0 : 3);
    const [usedDiscountButton, setUsedDiscountButton] = useState(false);
    const [showMoreObj, setShowMoreObj] = useState(defaultShowMoreObject);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [authenticated, setAuthenticated] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(
        mode === 'sandbox' ? true : false
    );
    useEffect(() => {
        if (mode === 'sandbox') return;
        // FACEBOOK PIXEL
        ReactPixel.init(keys.pixelID, options);
        // PINTEREST TAG
        ReactPinterestTag.init(keys.pinterestID);
    }, []);
    const logReactPixelPurchase = (data) => {
        if (mode === 'sandbox') return;
        ReactPixel.track('Purchase', data);
    };

    // Order Functionality
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
        console.log(data);
        console.log(newOrders);
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

    const resetOrders = () => {
        setAmount(0);
        setOrders([]);
    };

    return (
        <div>
            <CssBaseline />
            <Suspense fallback={<div />}>
                <Navbar amount={amount} />
            </Suspense>
            <Body
                mode={mode}
                orders={orders}
                addOrder={addOrder}
                removeOrder={removeOrder}
                resetOrders={resetOrders}
                amount={amount}
                logReactPixelPurchase={logReactPixelPurchase}
                usedDiscountButton={usedDiscountButton}
                setUsedDiscountButton={setUsedDiscountButton}
                showMoreObj={showMoreObj}
                setShowMoreObj={setShowMoreObj}
                yCoordinate={yCoordinate}
                setYCoordinate={setYCoordinate}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
            />
            <Suspense fallback={<div />}>
                <Snackbar
                    snackbarOpen={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                />
                <Footer />
            </Suspense>
        </div>
    );
};

export default App;
