import Button from "@material-ui/core/Button";
import TuneIcon from "@material-ui/icons/Tune";
import Popover from "@material-ui/core/Popover";
import {FormControlLabel, Switch} from "@material-ui/core";
import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Filters = ({ years, currentYear, handleYearChange, filterTop10Producers, filterTop10Consumers, handleFilterTop10ProducersChange, handleFilterTop10ConsumersChange }) => {
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
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentYear}
                                onChange={handleYearChange}
                            >
                                {years.map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl><br/>
                        <FormControlLabel
                            control={
                                <Switch checked={filterTop10Producers} onChange={handleFilterTop10ProducersChange} value="hidden" color="primary" />
                            }
                            label="Filter top 10 producers"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch checked={filterTop10Consumers} onChange={handleFilterTop10ConsumersChange} value="hidden" color="primary" />
                            }
                            label="Filter top 10 consumers"
                        />
                    </div>
                </Popover>
            </div>
        </>
    )
};

export default Filters;