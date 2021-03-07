import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tour, { ReactourStep } from 'reactour'
import { useTheme, makeStyles } from '@material-ui/core';
import { fetchDismissUserTour } from '../../redux/userTour/actions';
import { selectorGetUserTourById } from '../../redux/userTour/selectors';
import { RootState } from '../../redux';


const useStyles = makeStyles(theme => ({
    tourWrapper: {
        outline: 'none',
        '& button': {
            '&:focus': {
                outline: 'none',
            },
            '&:active': {
                outline: 'none',
            }
        }
    },
}));


export interface ITourWrapperProps {
    steps: ReactourStep[],
    tourId: string,
}

function TourWrapper({ steps, tourId }: ITourWrapperProps) {

    const dismissedTour = useSelector((store: RootState) => selectorGetUserTourById(store, tourId));
    const [tourOpen, setTourOpen] = useState(true);
    const theme = useTheme();
    const dispatch = useDispatch();
    const classes = useStyles();

    const closeTour = () => {
        setTourOpen(false);
        dispatch(fetchDismissUserTour({ tourId }));
    }

    // Don't show the tour if the user has already dismissed it
    useEffect(() => {
        if (dismissedTour) setTourOpen(false);
    }, [dismissedTour]);

    if (!tourOpen) return null;

    return (
        <Tour
            steps={steps}
            isOpen={tourOpen}
            onRequestClose={closeTour}
            accentColor={theme.palette.primary.main}
            rounded={theme.shape.borderRadius}
            className={classes.tourWrapper}
        />
    );
}


export default TourWrapper;