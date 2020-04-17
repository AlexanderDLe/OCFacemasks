import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './landing/Landing';
import Selection from './order/Selection';
import Item from './order/Item';
import Cart from './checkout/Cart';
import Shipping from './checkout/Shipping';
import Checkout from './checkout/Checkout';
import Success from './checkout/Success';
import Policies from './Policies';

function Body(props) {
    const {
        removeOrder,
        addOrder,
        orders,
        updateShippingInfo,
        shippingInfo,
        resetOrders,
        amount,
    } = props;

    return (
        <main className="body-class">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/selection" component={Selection} />
                <Route
                    exact
                    path="/item/:id"
                    render={(props) => <Item {...props} addOrder={addOrder} />}
                />
                <Route
                    exact
                    path="/cart"
                    render={() => (
                        <Cart
                            {...props}
                            removeOrder={removeOrder}
                            orders={orders}
                            resetOrders={resetOrders}
                            amount={amount}
                        />
                    )}
                />
                <Route
                    exact
                    path="/shipping"
                    render={() => (
                        <Shipping
                            {...props}
                            removeOrder={removeOrder}
                            updateShippingInfo={updateShippingInfo}
                        />
                    )}
                />
                <Route
                    exact
                    path="/checkout"
                    render={() => (
                        <Checkout
                            {...props}
                            orders={orders}
                            shippingInfo={shippingInfo}
                            resetOrders={resetOrders}
                            amount={amount}
                        />
                    )}
                />
                <Route
                    exact
                    path="/success"
                    render={() => (
                        <Success
                            {...props}
                            orders={orders}
                            shippingInfo={shippingInfo}
                            resetOrders={resetOrders}
                        />
                    )}
                />
                <Route exact path="/policies" component={Policies} />
            </Switch>
        </main>
    );
}

export default Body;
