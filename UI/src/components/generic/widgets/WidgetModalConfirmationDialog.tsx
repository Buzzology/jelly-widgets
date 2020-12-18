import React from 'react'
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import WidgetModalBase from './WidgetModalBase';
import { red } from '@material-ui/core/colors';
import AlertIcon from '@material-ui/icons/ReportProblem'


interface IWidgetModalConfirmationDialogProps {
    title: string;
    description: string;
    onConfirmCallback(): void,
    onCancelCallback(): void,
    open: boolean,
    confirmButtonText?: string,
    cancelButtonText?: string,
    subtitle: string,
}


const WidgetModalConfirmationDialog = ({ title, subtitle, description, open, onCancelCallback, onConfirmCallback, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel' }: IWidgetModalConfirmationDialogProps) => {
    return (
        <WidgetModalBase
            handleCancel={onCancelCallback}
            open={open}
            title={title}
            subtitle={subtitle}
            headerIcon={<AlertIcon />}
            headerColor={red[500]}
        >
            <DialogContent>
                {description}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    color="default"
                    onClick={onCancelCallback}
                    style={{ flexBasis: '50%' }}
                >
                    {cancelButtonText}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onConfirmCallback}
                    style={{ flexBasis: '50%' }}
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </WidgetModalBase>
    );
}

export default WidgetModalConfirmationDialog;