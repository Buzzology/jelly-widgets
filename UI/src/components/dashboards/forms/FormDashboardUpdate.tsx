import React, { useState } from 'react'
import { TextField, Grid, Divider, Button } from '@material-ui/core';
import { getFormikFieldProps } from '../../../utilities/Helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import WidgetModalConfirmationDialog from '../../generic/widgets/WidgetModalConfirmationDialog';
import { useDispatch } from 'react-redux';
import IDashboard from '../../../@types/Dashboard';
import { fetchDeleteDashboard, fetchUpdateDashboard } from '../../../redux/dashboard/actions';
import { useHistory } from 'react-router-dom';


interface FormProps {
    onCompleteCallback(): void,
    onCancelCallback(): void,
    dashboard: IDashboard,
}


const FormDashboardUpdate = ({ dashboard, onCancelCallback, onCompleteCallback }: FormProps) => {

    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const toggleDeleteConfirmation = () => setShowDeleteConfirmation(!showDeleteConfirmation);
    const history = useHistory();

    const onSubmit = async (updatedValues: IDashboard) => {

        setSubmitting(true);

        var updateDashboardResp = await dispatch(fetchUpdateDashboard({
            dashboard: updatedValues,
        })) as any;

        setSubmitting(false);

        if (updateDashboardResp) {
            onCompleteCallback();
        }
    }

    async function internalOnDelete() {
        setSubmitting(true);
        var dashboardUpdateResp = await dispatch(fetchDeleteDashboard({ dashboardId: dashboard?.dashboardId })) as any;
        setSubmitting(false);
        if (dashboardUpdateResp) {
            onCompleteCallback();
            history.push('/');
        }
    }

    return (
        <Formik
            initialValues={dashboard}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string()
                        .label('Name')
                        .min(1, 'Please input 1 character or more')
                        .max(50, 'Please input 50 characters or less')
                        .required('Please provide a name value'),
                })
            }
            onSubmit={onSubmit}
        >
            {props => {
                return (
                    <form onSubmit={props.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={props.handleChange}
                                    {...getFormikFieldProps(props, 'name', 'Name')}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider light={true} />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <div style={{ flexBasis: '100%', display: 'flex' }}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ flexBasis: '33%' }}
                                        onClick={toggleDeleteConfirmation}
                                        disabled={submitting}
                                    >
                                        Delete
                                    </Button>
                                    <div style={{ flexBasis: '66%', justifyContent: 'flex-end', display: 'flex' }}>
                                        <Button
                                            disabled={submitting}
                                            variant="text"
                                            color="default"
                                            onClick={onCancelCallback}
                                        >
                                            Cancel
                                        </Button>&nbsp;&nbsp;&nbsp;
                                        <Button
                                            type="submit"
                                            disabled={submitting}
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            <LoaderAbsoluteCentred loading={submitting} />
                            <WidgetModalConfirmationDialog
                                open={showDeleteConfirmation}
                                title={`Delete ${dashboard?.name}?`}
                                subtitle="Confirm delete"
                                description="Are you sure that you'd like to remove this dashboard?"
                                onCancelCallback={toggleDeleteConfirmation}
                                onConfirmCallback={internalOnDelete}
                                confirmButtonText="Delete"
                            />
                        </Grid>
                            </Grid>
                    </form>
    )
}}
        </Formik >
                )
            }

export default FormDashboardUpdate;