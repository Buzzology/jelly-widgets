import React from 'react';
import TourDefaultStepContainer from './TourDefaultStepContainer';
import TourWrapper from './TourWrapper';
import { Typography } from '@material-ui/core';

const TOUR_ID = "e38d8396-efef-4f23-9ade-c84db4ac7864";

function TourDashboard() {
    return (
        <TourWrapper
            steps={steps}
            tourId={TOUR_ID}
        />
    );
}

const steps = [
    {
        selector: '#body',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Dashboard</Typography>
                <Typography variant="body2" color="textSecondary">Your dashboard lets you organise your widgets.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#btn-dashboard-add',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Add Dashboard</Typography>
                <Typography variant="body2" color="textSecondary">You can add another one here.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#btn-widget-add',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Add a Widget</Typography>
                <Typography variant="body2" color="textSecondary">You can add widgets but clicking on the button here.</Typography>
            </TourDefaultStepContainer>
        ),
    },
];


export default TourDashboard;