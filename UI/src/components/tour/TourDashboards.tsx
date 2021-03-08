import React from 'react';
import TourDefaultStepContainer from './TourDefaultStepContainer';
import TourWrapper from './TourWrapper';
import { Typography } from '@material-ui/core';

const TOUR_ID = "e38d8396-efef-4f23-9ade-c84db4ac7864";

function TourDashboards() {
    return (
        <TourWrapper
            steps={steps}
            tourId={TOUR_ID}
        />
    );
}

const steps = [
    {
        selector: 'root',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Welcome!</Typography>
                <Typography variant="body2" color="textSecondary">This tour will give you a quick overview of how the app works.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#btn-add-dashboard',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Dashboards</Typography>
                <Typography variant="body2" color="textSecondary">These allow you to organise your widgets. You can add a dashboard by clicking here.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#txt-count-container',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Keep track of your free runs.</Typography>
                <Typography variant="body2" color="textSecondary">Keep track of how many free widget uses you have left. Don't worry if you run out, it resets every 24hrs.</Typography>
            </TourDefaultStepContainer>
        ),
    },
];


export default TourDashboards;