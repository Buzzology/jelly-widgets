import React, { ReactElement } from "react";
import { Grow } from '@material-ui/core';


interface IAnimationWrapperProps {
    children: ReactElement<any, any> | undefined
}

function AnimationWrapper({ children }: IAnimationWrapperProps) {

    if (!children) return null;

    return (
        <Grow in={true} mountOnEnter unmountOnExit>
            {children}
        </Grow>
    )
}

export default AnimationWrapper;