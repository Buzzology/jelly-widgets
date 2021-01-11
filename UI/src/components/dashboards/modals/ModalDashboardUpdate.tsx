import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import BuildIcon from '@material-ui/icons/Build'
import { deepOrange } from '@material-ui/core/colors';
import WidgetModalBase from '../../generic/widgets/WidgetModalBase';
import IDashboard from '../../../@types/Dashboard';
import FormDashboardUpdate from '../forms/FormDashboardUpdate';


export interface IModalDashboardUpdateProps {
    open: boolean,
    onCancelCallback(): void,
    onCompleteCallback(topicId?: string): void,
    dashboard: IDashboard,
}


function ModalDashboardUpdate({ onCancelCallback, open, onCompleteCallback, dashboard }: IModalDashboardUpdateProps) {
    return (
        <WidgetModalBase
            handleCancel={onCancelCallback}
            open={open}
            title={"Update dashboard"}
            subtitle={"Fill in the form to complete."}
            headerIcon={<BuildIcon />}
            headerColor={deepOrange[500]}
        >
            <DialogContent>
                <FormDashboardUpdate
                    onCancelCallback={onCancelCallback}
                    onCompleteCallback={onCompleteCallback}
                    dashboard={dashboard}
                />
            </DialogContent>
        </WidgetModalBase>
    );
}


export default ModalDashboardUpdate;