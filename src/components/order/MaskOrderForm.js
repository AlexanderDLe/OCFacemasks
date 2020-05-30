import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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
    },
    radioLabel: {
        color: 'black !important',
    },
    smallQuery: {
        display: 'flex',
        flexDirection: 'column',
    },
    sizeLabel: {
        color: 'rgba(0, 0, 0, 0.54) !important',
    },
    label: {
        paddingBottom: 8,
    },
}));

function MaskOrderForm({
    price,
    navMediaQuery,
    size,
    amount,
    handleChange,
    handleAmountChange,
}) {
    const classes = useStyles();

    // Dynamic Styles
    const radioQuery = navMediaQuery ? classes.normalQuery : classes.smallQuery;
    const spanQuery = navMediaQuery
        ? classes.spanDimensions
        : classes.smallSpanDimensions;

    const renderFormControlLabel = (value, label, measurement, description) => {
        return (
            <FormControlLabel
                className={classes.label}
                value={value}
                control={<Radio color="primary" />}
                label={
                    <div className={radioQuery}>
                        {label}
                        <span className={spanQuery}>
                            {measurement}
                            <br />
                            {description}
                        </span>
                    </div>
                }
            />
        );
    };

    return (
        <CardContent className={classes.customizeBox}>
            <FormControl style={{ width: '50%' }} component="fieldset">
                <FormLabel className={classes.sizeLabel} component="legend">
                    Select Size
                </FormLabel>
                <RadioGroup
                    aria-label="Mask Size"
                    name="Size"
                    value={size}
                    onChange={handleChange}
                >
                    {renderFormControlLabel(
                        'XL',
                        'XL Adult',
                        '10" x 6"',
                        'Large Adults'
                    )}
                    {renderFormControlLabel(
                        'L',
                        'L Adult',
                        '9.5" x 5.5"',
                        'Adults/Teens'
                    )}
                    {renderFormControlLabel(
                        'M',
                        'M Child',
                        '8.5" x 5"',
                        'Est. Ages 6-11'
                    )}
                    {renderFormControlLabel(
                        'S',
                        'S Child',
                        '7.5" x 4.5"',
                        'Est. Ages 4-6'
                    )}
                    {renderFormControlLabel(
                        'XS',
                        'XS Child',
                        '6.5" x 4"',
                        'Est. Ages 2-4'
                    )}
                </RadioGroup>
            </FormControl>
            <div style={{ width: '50%' }}>
                <FormLabel style={{ paddingLeft: 5 }} component="legend">
                    Amount
                </FormLabel>
                <TextField
                    id="standard-number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={amount}
                    onChange={handleAmountChange}
                    style={{ paddingLeft: 5 }}
                />
                <br />
                <br />
                <br />
                <FormLabel
                    style={{ paddingLeft: 5, marginBottom: 0 }}
                    component="legend"
                >
                    Price: <span style={{ color: 'black' }}>${price}</span>
                </FormLabel>
                <br />
                <br />
                <p
                    style={{
                        color: 'rgba(0,0,0,.5',
                        fontSize: '.85rem',
                        paddingLeft: 3,
                    }}
                >
                    Dimensions are in Width x Height
                    <br />
                    <br />
                    All measurements used measuring tape to follow the
                    front-facing cloth exterior.
                    <br />
                    <br />
                    Disclaimer: Some mask designs may vary depending on cut.
                </p>
            </div>
        </CardContent>
    );
}

export default MaskOrderForm;
