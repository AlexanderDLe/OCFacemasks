import React, { useEffect, useState, useMemo } from 'react';
import keys from '../../config/keys';
import { Link, Redirect } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useMediaQuery } from '@material-ui/core';
import moment from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CartItems from './CartItems';
import CartCalculations from './CartCalcuations';
import CartModal from './CartModal';

import axios from 'axios';
const API = keys.emailConfirmationAPI;
const trelloAPI = keys.trelloAPI;
const header = {
    'Content-Type': 'application/json',
};
const client = {
    sandbox: keys.paypalSandboxID,
    production: keys.paypalProductionID,
};
const currency = 'USD';
const discountCode = '15OFF';
const shippingFee = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        borderBottom: '2px solid #3f51b5',
        paddingBottom: 8,
        margin: 16,
    },
    link: {
        color: '#3f51b5',
        textDecoration: 'none',
    },
    cartTitle: {
        fontFamily: 'Open Sans',
    },
    paypalError: {
        textAlign: 'center',
        color: 'red',
    },
    backToSelectionButton: {
        margin: '8px 16px',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    warningIcon: {
        color: 'red',
        height: 65,
        width: 65,
        marginBottom: 8,
    },
}));

const calculateTimestamp = (time) => {
    let timestamp = time;
    console.log(timestamp);
    timestamp = moment(timestamp).tz('America/Los_Angeles').format().toString();
    timestamp = timestamp.split('T').join(' ');
    timestamp = timestamp.slice(0, timestamp.length - 9) + ' PT';
    return timestamp;
};

const setTrelloLabel = () => {
    const timestamp = moment().tz('America/Los_Angeles').format().toString();
    const date = moment(timestamp.slice(0, 10));
    const dow = date.day();

    const labels = {
        0: '5ebdcdfa50359740d35f8bf1',
        1: '5eb0d04b526baa3fdb30aedd',
        2: '5eb0d025cc223e226dc80988',
        3: '5eaf0c1c7669b22549987151',
        4: '5eaf0c1c7669b22549987154',
        5: '5eaf0c1c7669b22549987155',
        6: '5eaf0c1c7669b22549987156',
    };
    return [labels[dow]];
};

const calculateSubtotal = (orders) => {
    let subtotal = 0;
    for (let order of orders) {
        subtotal += order.price * order.amount;
    }
    return subtotal;
};

const extractOrderData = (ordersToExtract) => {
    let extractedOrders = [];
    for (let order of ordersToExtract) {
        extractedOrders.push({
            color: order.color,
            price: order.price,
            size: order.size,
            amount: order.amount,
        });
    }
    return extractedOrders;
};

const Cart = ({
    orders,
    removeOrder,
    resetOrders,
    amount,
    mode,
    logReactPixelPurchase,
    usedDiscountButton,
    setUsedDiscountButton,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const classes = useStyles();
    const [paypalError, setPaypalError] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [discountField, setDiscountField] = useState('');
    const navMediaQuery600 = useMediaQuery('(min-width:600px)');

    // Cart Root Styles
    const cartRootStyles = useMemo(() => {
        let marginTop = navMediaQuery600 ? 40 : 16;
        return { marginTop };
    }, [navMediaQuery600]);

    // Checkout Configuration
    const env = mode;
    const subtotal = useMemo(() => {
        return calculateSubtotal(orders);
    }, [orders]);
    const discount = useMemo(() => {
        return discountField === discountCode && subtotal > 40
            ? Math.ceil(subtotal * 0.15 * 100) / 100
            : 0;
    }, [subtotal, discountField]);
    const total = useMemo(() => {
        return ((subtotal + shippingFee - discount) * 100) / 100;
    }, [subtotal, discount]);

    console.log(total);

    // Checkout Functionality
    const onSuccess = async (details, data) => {
        const info = details.purchase_units[0];
        const address = {
            recipient_name: info.shipping.name.full_name,
            line1: info.shipping.address.address_line_1,
            line2: info.shipping.address.address_line_2,
            city: info.shipping.address.admin_area_2,
            state: info.shipping.address.admin_area_1,
            postal_code: info.shipping.address.postal_code,
            country_code: info.shipping.address.country_code,
        };
        const email = details.payer.email_address;
        const orderID = data.orderID;
        const amount = info.amount.value;
        let timestamp = calculateTimestamp(details.create_time);
        let orderData = extractOrderData(orders);
        const event = {
            orders: orderData,
            address,
            email,
            orderID,
            amount,
            timestamp,
            mode,
        };

        console.log('Details: ', details);
        console.log('Data: ', data);
        console.log('Event: ', event);

        const cardName = `${address.recipient_name} - ${orderID.slice(0, 3)}`;
        const newCard = {
            name: cardName,
            pos: 'bottom',
            idLabels: setTrelloLabel(),
        };
        console.log(newCard);

        try {
            await axios.post(trelloAPI, newCard);
        } catch (error) {
            console.log(error);
        }
        try {
            await axios.post(API, event, header);
        } catch (error) {
            console.log(error);
        }

        logReactPixelPurchase({
            currency: 'USD',
            value: amount,
        });
        resetOrders();
        setCheckedOut(true);
    };
    const onCancel = (data) => {
        setModalOpen(true);
        console.log('The payment was canceled', data);
    };
    const onError = (err) => {
        console.log('There was an error', err);
        setPaypalError(true);
    };

    if (checkedOut) return <Redirect to="/success" />;

    return (
        <Card style={cartRootStyles} className={classes.root} elevation={3}>
            <CardContent>
                <Typography
                    className={classes.cartTitle}
                    variant="h4"
                    component="h2"
                >
                    Cart
                </Typography>
            </CardContent>

            <CardContent>
                <CartItems orders={orders} removeOrder={removeOrder} />
                <CartCalculations
                    amount={amount}
                    subtotal={subtotal}
                    total={total}
                    shippingFee={shippingFee}
                    discountCode={discountCode}
                    discount={discount}
                    discountField={discountField}
                    setDiscountField={setDiscountField}
                    usedDiscountButton={usedDiscountButton}
                    setUsedDiscountButton={setUsedDiscountButton}
                />
            </CardContent>
            <CartModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

            {amount === 0 ? (
                ''
            ) : (
                <div style={{ padding: '0px 16px' }}>
                    <PayPalButton
                        currency={currency}
                        amount={total}
                        onSuccess={onSuccess}
                        onError={onError}
                        catchError={onError}
                        options={{ clientId: client[env] }}
                        onCancel={onCancel}
                    />
                </div>
            )}
            <Button
                className={classes.backToSelectionButton}
                size="small"
                color="primary"
            >
                <Link to="/selection" className={classes.link}>
                    Mask Selection
                </Link>
            </Button>
            {paypalError ? (
                <div className={classes.paypalError}>
                    Sorry, there was an error.
                </div>
            ) : (
                ''
            )}
        </Card>
    );
};

export default Cart;
