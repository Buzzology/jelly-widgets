import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, IconButton, makeStyles, InputAdornment, TextField, Grow, Paper, useTheme, Button, Fade } from '@material-ui/core';
import { useStripe } from '@stripe/react-stripe-js';
import { fetchCheckoutPortalSessionId } from '../../../redux/paymentSessions/actions';
import { CustomColors } from '../../../utilities/Styles';
import { green, indigo, blue, yellow, pink, blueGrey } from '@material-ui/core/colors';
import Tick from '@material-ui/icons/CheckTwoTone'
import ButtonPrimary from '../../generic/buttons/ButtonPrimary';
import ButtonPrimaryDark from '../../generic/buttons/ButtonPrimaryDark';
import AnimationWrapper from '../../generic/animations/AnimationWrapper';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';


const ProductSelect = () => {


    const stripe = useStripe();
    const theme = useTheme();

    // TODO: Make prices configurable
    async function purchaseMonthly() {
        var sessionId = await fetchCheckoutPortalSessionId({ lineItems: [{ priceId: "price_1IARejB2aL3Fzkly4cVdakx8", quantity: 1 }] });
        if (sessionId) stripe?.redirectToCheckout({ sessionId });
    }


    async function purchaseAnnual() {
        var sessionId = await fetchCheckoutPortalSessionId({ lineItems: [{ priceId: "price_1IARejB2aL3FzklymW0uRgIU", quantity: 1 }] });
        if (sessionId) stripe?.redirectToCheckout({ sessionId });
    }


    async function teamMembershipClicked() {
        alert('TODO');
    }

    return (
        <Container
            style={{
                paddingTop: 24,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'center',
            }}
            maxWidth={false}
        >
            <Grid container spacing={3} style={{ maxWidth: 950 }}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" style={{
                        fontWeight: 650,
                    }}>
                        Thanks for the support!
                    </Typography>
                    <Typography
                        variant="subtitle2"
                    >
                        If there are any widgets you wanted added please let me know.
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                    <ProductDisplay
                        price="$7.50"
                        priceDescription="Monthly"
                        buttonText="Subscribe"
                        content={
                            <div>
                                <Typography variant="body1">
                                    <TextLine>No daily execution limit.</TextLine>
                                    <TextLine>Slack invitation.</TextLine>
                                    <TextLine>Cancel at any time.</TextLine>
                                </Typography>
                            </div>
                        }
                        onClick={purchaseMonthly}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ProductDisplay
                        price="$59.99"
                        priceDescription="Annual"
                        buttonText="Subscribe"
                        content={
                            <div>
                                <Typography variant="body1">
                                    <TextLine>No daily execution limit.</TextLine>
                                    <TextLine>Slack invitation.</TextLine>
                                    <TextLine>Cancel at any time.</TextLine>
                                    <TextLine>Save $30.01</TextLine>
                                </Typography>
                            </div>
                        }
                        onClick={purchaseAnnual}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ProductDisplay
                        price="TBA"
                        priceDescription="Team"
                        buttonText="Contact Me"
                        content={
                            <div>
                                <Typography variant="body1">
                                    <TextLine>No daily execution limit.</TextLine>
                                    <TextLine>Slack invitation.</TextLine>
                                    <TextLine>API access.</TextLine>
                                    <TextLine>User management.</TextLine>
                                    <TextLine>Roadmap input.</TextLine>
                                    <TextLine>Widget requests.</TextLine>
                                </Typography>
                            </div>
                        }
                        onClick={teamMembershipClicked}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}


const TextLine = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Tick style={{
                color: green[500],
                fontSize: '22px',
                marginBottom: -3,
                marginRight: 6
            }} />{children}<br />
        </>
    )
}


interface IProductDisplayProps {
    headerColor?: string,
    price: string,
    priceDescription: string,
    content: React.ReactNode,
    buttonText: string,
    onClick(): void,
}

const ProductDisplay = ({
    headerColor = CustomColors.MetalBackgroundColor,
    price,
    priceDescription,
    content,
    buttonText,
    onClick
}: IProductDisplayProps) => {

    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const internalButtonClick = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await onClick();
        setLoading(false);
    }

    return (
        <AnimationWrapper>
            <div style={{
                backgroundColor: headerColor,
                borderRadius: theme.shape.borderRadius,
                height: '100%',
                position: 'relative',
                marginBottom: theme.spacing(9),
            }}>
                <div
                    style={{
                        backgroundColor: CustomColors.DarkBrownSecondaryColor,
                        borderRadius: '4px 4px 0 0',
                        textAlign: 'center',
                        color: '#FFF',
                        padding: '16px 16px'
                    }}>
                    <Typography
                        variant="overline"
                        align="center"
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        {priceDescription}
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                    >
                        {price}
                    </Typography>
                </div>
                <div
                    style={{
                        padding: theme.spacing(3),
                        textAlign: 'left',
                    }}
                >
                    {content}
                </div>
                <div
                    style={{
                        padding: theme.spacing(3),
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        textAlign: 'center',
                    }}
                >
                    <ButtonPrimaryDark
                        onClick={internalButtonClick}
                        style={{
                            backgroundColor: CustomColors.DarkBrownSecondaryColor,
                            color: '#FFF'
                        }}
                    >
                        {buttonText}
                    </ButtonPrimaryDark>
                    {loading && <LoaderAbsoluteCentred loading={true} />}
                </div>
            </div>
        </AnimationWrapper>
    )
}

export default ProductSelect;