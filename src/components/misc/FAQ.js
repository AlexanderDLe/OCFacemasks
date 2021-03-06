import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 750,
        borderBottom: '2px solid #3f51b5',
        padding: 16,
        margin: 24,
        marginTop: 40,
    },
    question: {
        paddingLeft: 10,
        fontSize: '1.15rem',
        paddingTop: 12,
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            height: 'calc(100% - 12px)',
            width: '2px',
            backgroundColor: '#3f51b5',
            position: 'absolute',
            left: '-0px',
        },
    },
    viewSelectionButton: {
        color: 'white !important',
        textDecoration: 'none',
    },
    buttonDiv: {
        margin: 8,
        marginTop: 24,
        textAlign: 'center',
    },
}));

function FAQ() {
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Card className={classes.root} elevation={3}>
            <h2>Frequently Asked Questions</h2>
            <hr />
            <h5 className={classes.question}>
                What are these masks made of? How many layers?
            </h5>
            <p>
                There are 4 layers of different materials that work together to
                filter particles in the air. These materials include
                tightly-woven cotton and a non-woven rayon & polyester blend.
                <br />
                <br />
                Studies have shown that a mix of different materials helps
                filter particles in the air. We prioritize safety and health.
            </p>
            <h5 className={classes.question}>Are these masks washable?</h5>
            <p>
                Yes, we recommend washing with cold water & soap then hanging to
                air dry. Avoid using hot water or a dryer as the prolonged heat
                may shrink certain fabric. You may use an iron to smoothen any
                following wrinkles.
            </p>
            <h5 className={classes.question}>How much do these masks cost?</h5>
            <p>
                Each mask is currently priced at $12.50 each with absolutely
                free shipping in the US.
            </p>
            <h5 className={classes.question}>Is there a discount available?</h5>
            <p>
                Yes, there is a 15% discount for $45+ subtotal orders. Simply
                use code 15OFF in the cart to apply.
            </p>
            <h5 className={classes.question}>How long will delivery take?</h5>
            <p>Delivery will typically be within 5-9 business days.</p>
            <h5 className={classes.question}>
                Do these masks come with elastic? How long are they? Are they
                adjustable?
            </h5>
            <p>
                Yes, each mask comes with two elastic bands - one for looping
                around each ear. Each of the bands are 10 inches in length.
                <br />
                <br />
                Each elastic band comes with a plastic adjuster that you can use
                to adjust for a comfortable fit!
            </p>

            <h5 className={classes.question}>Is there a nosepiece?</h5>
            <p>
                Yes, each mask comes with an adjustable/bendable metal nose wire
                that you can use to adjust for a comfortable fit.
            </p>

            <h5 className={classes.question}>Where are these masks made?</h5>
            <p>
                All masks are produced and shipped from Anaheim, California,
                USA.
            </p>

            <h5 className={classes.question}>
                How do you know what size to get?
            </h5>
            <p>
                There are size dimensions (Width x Height in inches) available
                on each product page. Select a size that would best suit you.
            </p>
            <h5 className={classes.question}>Do they have a filter pocket?</h5>
            <p>
                No, these masks do not have filter pockets - but they are
                resusable by proper washing.
            </p>
            <h5 className={classes.question}>How many designs do you have?</h5>
            <p>
                We have over 100 designs and counting. We're constantly
                increasing our options so you may find what you like! On the
                flip side, certain popular designs may eventually run out and
                become unavailable so get them while you can!
            </p>
            <h5 className={classes.question}>
                Where are the face shields made?
            </h5>
            <p>All masks are made in USA but face shields are made in China.</p>
            <h5 className={classes.question}>
                How can I get in contact with you?
            </h5>
            <p>
                If you wish to get in touch, you can send an email to
                contact@cafacemasks.com.
            </p>
            <div className={classes.buttonDiv}>
                <Link to="/selection" className={classes.viewSelectionButton}>
                    <Button variant="contained" color="primary" size="medium">
                        View Selection
                    </Button>
                </Link>
            </div>
        </Card>
    );
}

export default FAQ;
