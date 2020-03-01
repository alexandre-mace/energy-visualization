import Button from "@material-ui/core/Button";
import TuneIcon from "@material-ui/icons/Tune";
import Popover from "@material-ui/core/Popover";
import {FormControlLabel, Switch} from "@material-ui/core";
import React from "react";

const Filters = ({ filterTop10, handleFilterTop10Change }) => {
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
            <Button aria-describedby={id} className={"h-100 settings-button"} variant="contained" color="primary" onClick={handleClick}>
                <TuneIcon/>
            </Button>
            <div className="settings-container">
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
                        <FormControlLabel
                            control={
                                <Switch checked={filterTop10} onChange={handleFilterTop10Change} value="hidden" color="primary" />
                            }
                            label="Filter top 10"
                        />
                    </div>
                </Popover>
            </div>
        </>
    )
};

export default Filters;