import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    contentDiv: {
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    }
}));


export interface ITourDefaultStepContainerProps {
    children: React.ReactNode | React.ReactNodeArray,
}


function TourDefaultStepContainer({ children }: ITourDefaultStepContainerProps) {

    const classes = useStyles();

    return (
        <div className={classes.contentDiv}>
            {children}
        </div>
    );
}


export default TourDefaultStepContainer;