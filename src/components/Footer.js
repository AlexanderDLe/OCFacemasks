import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            CAFacemasks.com {new Date().getFullYear()} |{' '}
            <Link
                to="/policies"
                style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    textDecoration: 'none',
                }}
            >
                Refund, Customer Service, & Privacy Policy
            </Link>
            <a
                // className={classes.paypalAUP}
                style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}
                href="https://www.paypal.com/us/webapps/mpp/ua/acceptableuse-full"
                target="_blank"
                rel="noopener noreferrer"
            >
                {' '}
                | PayPal Acceptable Use Policy
            </a>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: '#fbfbfb',
        padding: theme.spacing(6),
    },
}));

export default function Album() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}
