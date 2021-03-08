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
        selector: 'root',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">New Dashboard!</Typography>
                <Typography variant="body2" color="textSecondary">You've got a brand new dashboard here. Add widgets to give it some functionality.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#btn-add-widget',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Add a Widget</Typography>
                <Typography variant="body2" color="textSecondary">You can add widgets by clicking this button.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#dashboard-selection',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Switching dashboards.</Typography>
                <Typography variant="body2" color="textSecondary">You can switch dashboards by using the sidebar.</Typography>
            </TourDefaultStepContainer>
        ),
    },
    {
        selector: '#btn-edit-dashboard',
        content: (
            <TourDefaultStepContainer>
                <Typography variant="body1">Rename dashboard.</Typography>
                <Typography variant="body2" color="textSecondary">You can rename a dashboard using the button here.</Typography>
            </TourDefaultStepContainer>
        ),
    },
];


export default TourDashboard;