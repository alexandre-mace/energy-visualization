import Button from "@material-ui/core/Button";
import InfoIcon from '@material-ui/icons/Info';
import Popover from "@material-ui/core/Popover";
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
            <Button size={"large"} aria-describedby={id} className={"info-button"} variant="contained" color="primary" onClick={handleClick}>
                <InfoIcon fontSize={"large"}/>
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
                        This is a visualization of country energy production and consumption<br/><br/>
                        Sources : <br/>
                        <a href="https://yearbook.enerdata.net/total-energy/world-energy-production.html">Production</a> <br/>
                        <a href="https://yearbook.enerdata.net/total-energy/world-consumption-statistics.html">Consumption</a>
                    </div>
                </Popover>
            </div>
        </>
    )
};

export default ComplementaryInformation;