import { Typography, useTheme } from "@material-ui/core";
import React from "react"
import WidgetIcon from "../../../../widgets/WidgetIcon";

export const WidgetHeader = ({ widgetId, title, description } : { widgetId: string, title: string | undefined, description: string | undefined }) => {

    const theme = useTheme();

    return (
        <div style={{ marginBottom: theme.spacing(3), display: 'flex' }}>
            <div style={{
                width: 60,
                marginRight: 20,
            }}>
                <WidgetIcon widgetId={widgetId} />
            </div>
            <div
                style={{
                    flex: 1,
                }}
            >
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </div>
        </div>
    )
}