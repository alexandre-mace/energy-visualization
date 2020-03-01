import Button from "@material-ui/core/Button";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";
import {FormControlLabel, Switch} from "@material-ui/core";
import React from "react";

const ComplementaryInformation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        if (anchorEl !== null) {
            return handleClose()
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} className={"h-100 info-button"} variant="contained" color="primary" onClick={handleClick}>
                <InfoIcon/>
            </Button>
            <div className="info-container">
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className={"mt-3"}
                    anchorReference="anchorEl"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className={"p-3"}>
                        This is a visualization of country energy production and consumption for the year of 2015 <br/><br/>
                        Sources : <br/>
                        <a href="https://data.open-power-system-data.org/national_generation_capacity/">Production</a> <br/>
                        <a href="https://data.europa.eu/euodp/en/data/dataset/Jat1A5cjQ2XK3Yq7cv779g">Consumption</a>
                    </div>
                </Popover>
            </div>
        </>
    )
};

export default ComplementaryInformation;