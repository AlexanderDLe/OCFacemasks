import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    customizeBox: {
        paddingTop: 16,
        display: 'flex',
    },
    spanDimensions: {
        paddingLeft: 8,
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
    },
    smallSpanDimensions: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: '.8rem',
        paddingBottom: 12,
    },
    radioLabel: {
        color: 'black',
    },
    sizeLabel: {
        color: 'rgba(0, 0, 0, 0.54) !important',
    },
    amountBox: {
        display: 'flex',
    },
    amountField: {
        marginTop: 10,
        paddingLeft: 5,
        width: '70%',
    },
    arrowsBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    arrow: {
        cursor: 'pointer',
    },
}));

function MaskOrderForm({
    navMediaQuery,
    size,
    amount,
    handleChange,
    handleAmountChange,
    incrementAmount,
    decrementAmount,
}) {
    const classes = useStyles();

    // Dynamic Styles
    const radioQuery = navMediaQuery ? classes.normalQuery : classes.smallQuery;
    const spanQuery = navMediaQuery
        ? classes.spanDimensions
        : classes.smallSpanDimensions;

    return (
        <CardContent className={classes.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={classes.sizeLabel} component="legend">
                    Select Amount
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="1x"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                1x Face Shield
                                <span className={spanQuery}>$10</span>
                            </div>
                        }
                    />
                    <FormControlLabel
                        value="3x"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                3x Face Shields
                                <span className={spanQuery}>$20</span>
                            </div>
                        }
                    />
                    <FormControlLabel
                        value="5x"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                5x Face Shields
                                <span className={spanQuery}>$30</span>
                            </div>
                        }
                    />
                    <FormControlLabel
                        value="10x"
                        control={<Radio color="primary" />}
                        label={
                            <div className={radioQuery}>
                                10x Face Shields
                                <span className={spanQuery}>$50</span>
                            </div>
                        }
                    />
                </RadioGroup>
            </FormControl>
            <div style={{ width: '50%' }}>
                {/* <br />
                <br /> */}
                <p style={{ color: 'rgba(0,0,0,.5', fontSize: '.85rem' }}>
                    Face Shields offer additional protection but are not a
                    replacement for facemasks.
                    <br />
                    <br />
                    An elastic band is worn to support the faceshield.
                    <br />
                    <br />
                    All masks are made in USA but face shields are not. Please
                    read the FAQ.
                </p>
            </div>
        </CardContent>
    );
}

export default MaskOrderForm;
