// import React from 'react';
// import DialogContent from '@material-ui/core/DialogContent';
// import { useDispatch } from 'react-redux';
// import BuildIcon from '@material-ui/icons/Build'
// import { deepOrange } from '@material-ui/core/colors';
// import WidgetModalBase from '../../generic/widgets/WidgetModalBase';
// import FormTopicUpdate from '../forms/FormDashboardUpdate';
// import { useHistory } from 'react-router-dom';


// export interface IModalTopicUpdateProps {
//     open: boolean,
//     onCancelCallback(): void,
//     onCompleteCallback(topicId?: string): void,
//     topic: ITopic,
// }


// function ModalTopicUpdate({ onCancelCallback, open, onCompleteCallback, topic }: IModalTopicUpdateProps) {

//     const dispatch = useDispatch();
//     const history = useHistory();

//     return (
//         <WidgetModalBase
//             handleCancel={onCancelCallback}
//             open={open}
//             title={"Update topic"}
//             subtitle={"Fill in the form to complete."}
//             headerIcon={<BuildIcon />}
//             headerColor={deepOrange[500]}
//         >
//             <DialogContent>
//                 <FormTopicUpdate
//                     history={history}
//                     dispatch={dispatch}
//                     onCancelCallback={onCancelCallback}
//                     onCompleteCallback={onCompleteCallback}
//                     topic={topic}
//                 />
//             </DialogContent>
//         </WidgetModalBase>
//     );
// }


// export default ModalTopicUpdate;

export default 4;