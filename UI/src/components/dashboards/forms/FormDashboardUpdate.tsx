// import React, { useState } from 'react'
// import { TextField, Grid, Divider, Button, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';
// import { getFormikFieldProps } from '../../../utilities/Helpers';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import LoaderAbsoluteCentred from '../../generic/loaders/LoaderAbsoluteCentred';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { RootState } from '../../../redux';
// import { ITopic, TopicInviteTypeEnum } from '../../../@types/Topic';
// import { fetchUpdateTopic, fetchDeleteTopic, fetchSearchTopics } from '../../../redux/topic/actions';
// import WidgetModalConfirmationDialog from '../../generic/widgets/WidgetModalConfirmationDialog';
// import { GetTopicLinkByTopicName } from '../../../routes/RouteLinkHelpers';
// import TopicIcon from '../TopicIcon';
// import { EntityTypeEnum } from '../../../@types/Entity';
// import { FileTypeEnum } from '../../../@types/File';
// import UploadIcon from '@material-ui/icons/CloudUpload';
// import ModalFileUpload from '../../file/modals/ModalFileUpload';
// import { CustomColors } from '../../../utilities/Styles';


// const useStyles = makeStyles(theme => ({
//     genericActionIcon: {
//         cursor: 'pointer',
//         transition: 'color 300ms ease-out',
//         color: '#FFF',
//         position: 'absolute',
//         left: 'calc(50% - 12px)',
//         top: 'calc(50% - 12px)',
//         '&:hover': {
//             color: CustomColors.ActiveItemBlue,
//         }
//     },
// }));

// interface FormValues {
//     description: string,
//     inviteType: TopicInviteTypeEnum,
//     warning: boolean,
// }


// interface FormProps {
//     topic: ITopic,
//     onCompleteCallback(topicId?: string): void,
//     onCancelCallback(): void,
//     dispatch: ThunkDispatch<RootState, ITopic, AnyAction>,
//     history: any,
// }

// const FormTopicUpdate = (formProps: FormProps) => {

//     const { onCompleteCallback, dispatch, topic, onCancelCallback } = formProps;
//     const [submitting, setSubmitting] = useState(false);
//     const [deleting] = useState(false);
//     const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//     const toggleDeleteConfirmation = () => setShowDeleteConfirmation(!showDeleteConfirmation);
//     const [uploadOpen, setUploadOpen] = useState(false);
//     const classes = useStyles();
//     const toggleUploadOpen = () => setUploadOpen(!uploadOpen);

//     async function onUploadComplete(fileId: string) {
//         setUploadOpen(false);
//         if (fileId) {
//             setTimeout(async () => {
//                 await dispatch(fetchSearchTopics({ topicId: topic.topicId, pageNumber: 1, pageSize: 1 }));
//             }, 2000);
//         }
//     }

//     const onSubmit = async (values: FormValues) => {

//         setSubmitting(true);

//         // Map dispatch via props
//         var topicId = await dispatch(fetchUpdateTopic({
//             ...topic,
//             ...values
//         })) as string;

//         if (topicId) {

//             setTimeout(async () => {

//                 // Retrieve the updated topic
//                 await dispatch(fetchSearchTopics({ topicId, pageSize: 100, pageNumber: 1 }));

//                 formProps.history.push(GetTopicLinkByTopicName(topicId));
//                 onCompleteCallback(topicId);
//                 setSubmitting(false);
//             }, 2000);
//         }
//         else {
//             setSubmitting(false);
//         }
//     }


//     async function deleteTopic() {

//         setSubmitting(true);

//         // Map dispatch via props
//         var topicId = await dispatch(fetchDeleteTopic({ topicId: topic.topicId })) as string;

//         setSubmitting(false);

//         if (topicId) onCompleteCallback(topicId);
//     }


//     // async function deleteHandler() {

//     //     // Inform user
//     //     setDeleting(true);
//     //     var message = await ShowMessage("Removing...", MessageTypeEnum.Information);
//     //     setShowDeleteConfirmation(false);

//     //     // Perform delete
//     //     var resp = await dispatch(fetchDeleteDecision({ decisionId }));

//     //     // Cleanup
//     //     setDeleting(false);
//     //     if (resp != null) {
//     //         UpdateMessage({ ...message, text: "Removed", type: MessageTypeEnum.Success });
//     //         onCancelCallback();
//     //     }
//     // }

//     return (
//         <Formik
//             initialValues={{
//                 ...formProps.topic
//             }}
//             onSubmit={onSubmit}
//             render={props => {

//                 const { topic } = formProps;

//                 return (
//                     <form onSubmit={props.handleSubmit}>
//                         <Grid container spacing={2}>

//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     onChange={props.handleChange}
//                                     {...getFormikFieldProps(props, 'name', 'Name')}
//                                     fullWidth
//                                     margin="normal"
//                                     disabled={true}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={6}>
//                                 <div style={{ textAlign: 'center', position: 'relative' }}>
//                                     <TopicIcon
//                                         topicName={topic.name}
//                                     />
//                                     <UploadIcon
//                                         className={classes.genericActionIcon}
//                                         onClick={toggleUploadOpen}
//                                     />
//                                 </div>
//                                 <ModalFileUpload
//                                     entityId={topic.topicId}
//                                     entityType={EntityTypeEnum.Topic}
//                                     description={topic.name}
//                                     fileType={FileTypeEnum.Image}
//                                     onUploadCompleteCallback={onUploadComplete}
//                                     handleCancel={toggleUploadOpen}
//                                     open={uploadOpen}
//                                     maxHeight={50}
//                                     maxWidth={50}
//                                     minHeight={50}
//                                     minWidth={50}
//                                 />
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <TextField
//                                     onChange={props.handleChange}
//                                     {...getFormikFieldProps(props, 'description', 'Description')}
//                                     type="text"
//                                     fullWidth
//                                     margin="normal"
//                                     multiline={true}
//                                     rows={3}
//                                 />
//                             </Grid>

//                             {/* <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth={true}>
//                                     <InputLabel id="lbl-invite-type">Invitation Type</InputLabel>
//                                     <Select
//                                         labelId="lbl-invite-type"
//                                         {...getFormikFieldProps(props, 'inviteType', 'Type')}
//                                         // onChange={(e) => props.setFieldValue('inviteType', e?.target?.value)}
//                                         defaultValue={TopicInviteTypeEnum.TopicInviteTypeOpen}
//                                         style={{ display: 'block' }}
//                                         id="txt-invite-type"
//                                     >
//                                         <MenuItem value={TopicInviteTypeEnum.TopicInviteTypeOpen}>Open</MenuItem>;
//                                         <MenuItem value={TopicInviteTypeEnum.TopicInviteTypeAdminApprovalRequired}>Approval Required</MenuItem>;
//                         </Select>
//                                 </FormControl>
//                             </Grid> */}

//                             <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={props.values.warning}
//                                             onChange={() => props.setFieldValue("warning", !props.values.warning)}
//                                             value={true}
//                                             color="primary"
//                                         />
//                                     }
//                                     label="Show Warning"
//                                 />
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <Divider light={true} />
//                             </Grid>

//                             <Grid item xs={12} style={{ textAlign: 'right' }}>
//                                 <div style={{ flexBasis: '100%', display: 'flex' }}>
//                                     <Button
//                                         color="secondary"
//                                         variant="contained"
//                                         style={{ flexBasis: '33%' }}
//                                         onClick={toggleDeleteConfirmation}
//                                         disabled={true} // TODO return once implemented
//                                     >
//                                         Delete
//                         </Button>
//                                     <div style={{ flexBasis: '66%', justifyContent: 'flex-end', display: 'flex' }}>
//                                         <Button
//                                             disabled={props.isSubmitting}
//                                             variant="text"
//                                             color="default"
//                                             onClick={onCancelCallback}
//                                         >
//                                             Close
//                                 </Button>&nbsp;&nbsp;&nbsp;
//                                 <Button
//                                             type="submit"
//                                             disabled={props.isSubmitting}
//                                             variant="outlined"
//                                             color="primary"
//                                         >
//                                             Update
//                                 </Button>
//                                     </div>
//                                 </div>
//                                 <LoaderAbsoluteCentred loading={props.isSubmitting} />
//                                 <LoaderAbsoluteCentred loading={submitting || deleting} />
//                                 <WidgetModalConfirmationDialog
//                                     open={showDeleteConfirmation}
//                                     title="Delete topic"
//                                     subtitle="Confirm topic delete"
//                                     description="Are you sure that you'd like to remove this topic?"
//                                     onCancelCallback={toggleDeleteConfirmation}
//                                     onConfirmCallback={deleteTopic}
//                                     confirmButtonText="Delete"
//                                 />
//                             </Grid>
//                         </Grid >
//                     </form>
//                 )
//             }}
//             validationSchema={() => {
//                 return Yup.object().shape(
//                     {
//                         name: Yup.string()
//                             .label('Label')
//                             .min(3, 'Please input 3 characters or more')
//                             .max(50, 'Please input 50 characters or less')
//                             .required('Please provide a name'),
//                         description: Yup.string()
//                             .label('Description')
//                             .max(2500, 'Please input 2500 characters or less'),
//                         orderNumber: Yup.number()
//                             .label('Max Value')
//                             .min(0, 'Zero or more.')
//                             .max(999999, 'Less than 999'),
//                     }
//                 )
//             }}
//         />
//     );
// }


// export default FormTopicUpdate;

export default 3;