import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import BuildIcon from '@material-ui/icons/Build'
import { deepOrange } from '@material-ui/core/colors';
import WidgetModalBase from '../../generic/widgets/WidgetModalBase';
import FormDashboardCreate from '../forms/FormDashboardCreate';


export interface IModalDashboardCreateProps {
    open: boolean,
    onCancelCallback(): void,
    onCompleteCallback(topicId?: string): void,
}


function ModalDashboardCreate({ onCancelCallback, open, onCompleteCallback }: IModalDashboardCreateProps) {
    return (
        <WidgetModalBase
            handleCancel={onCancelCallback}
            open={open}
            title={"Create a new dashboard"}
            subtitle={"Dashboards are used to group widgets. For example, you might use one dashboard for your financial widgets and another for higher education."}
            headerIcon={<BuildIcon />}
            headerColor={deepOrange[500]}
        >
            <DialogContent>
                <FormDashboardCreate
                    formValues={{
                        name: '',
                    }}
                    onCancelCallback={onCancelCallback}
                    onCompleteCallback={onCompleteCallback}
                />
            </DialogContent>
        </WidgetModalBase>
    );
}


export default ModalDashboardCreate;