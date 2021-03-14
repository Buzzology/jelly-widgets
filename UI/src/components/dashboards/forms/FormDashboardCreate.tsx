import React, { useState } from 'react'
import { TextField, Grid, Divider } from '@material-ui/core';
import { getFormikFieldProps } from '../../../utilities/Helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { fetchCreateDashboard } from '../../../redux/dashboard/actions';
import { useDispatch } from 'react-redux';
import { GetDashboardLinkByDashboardIdAndName } from '../../../routes/RouteLinkHelpers';
import { useHistory } from 'react-router-dom';
import ButtonPrimaryDark from '../../generic/buttons/ButtonPrimaryDark';
import ButtonSecondary from '../../generic/buttons/ButtonSecondary';


interface FormValues {
    name: string,
}


interface FormProps {
    onCompleteCallback(topicId?: string): void,
    onCancelCallback(): void,
    formValues: FormValues,
}


const FormDashboardCreate = ({ formValues, onCancelCallback, onCompleteCallback }: FormProps) => {

    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const history = useHistory();

    const internalOnSubmit = async (values: FormValues) => {
        setSubmitting(true);
        var dashboardCreateResp = await dispatch(fetchCreateDashboard({ ...values })) as any;
        setSubmitting(false);

        if (dashboardCreateResp?.dashboardId) {
            onCompleteCallback();
            history.push(GetDashboardLinkByDashboardIdAndName(dashboardCreateResp.dashboardId, dashboardCreateResp.name));
        }
    }

    return (
        <Formik
            initialValues={formValues}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string()
                        .label('Name')
                        .min(1, 'Please input 1 character or more')
                        .max(50, 'Please input 50 characters or less')
                        .required('Please provide a name value'),
                })
            }
            onSubmit={internalOnSubmit}
        >
            {props => {
                return (
                    <form onSubmit={props.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                <ButtonSecondary
                                    disabled={submitting}
                                    variant="text"
                                    color="default"
                                    onClick={onCancelCallback}
                                >
                                    Cancel
                                </ButtonSecondary>&nbsp;&nbsp;&nbsp;
                                <ButtonPrimaryDark
                                    type="submit"
                                    disabled={submitting}
                                    variant="contained"
                                    color="primary">
                                    Create
                                </ButtonPrimaryDark>
                                <LoaderAbsoluteCentred loading={submitting} />
                            </Grid>
                        </Grid>
                    </form>
                )
            }}
        </Formik>
    )
}

export default FormDashboardCreate;