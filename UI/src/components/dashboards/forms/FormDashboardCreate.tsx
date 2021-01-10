import React, { useState } from 'react'
import { TextField, Grid, Divider, Button } from '@material-ui/core';
import { getFormikFieldProps } from '../../../utilities/Helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
import { fetchCreateDashboard } from '../../../redux/dashboard/actions';
import { useDispatch } from 'react-redux';


interface FormValues {
    name: string,
}


interface FormProps {
    onCompleteCallback(topicId?: string): void,
    onCancelCallback(): void,
    formValues: FormValues,
}


const FormDashboardCreate = ({ formValues, onCancelCallback }: FormProps) => {

    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);

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
            onSubmit={async (values) => {
                setSubmitting(true);
                await dispatch(fetchCreateDashboard({ ...values }));
                setSubmitting(false);
            }}
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
                                    Create
                                </Button>
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