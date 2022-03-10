import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Button } from "@mui/material";

const filter = createFilterOptions();
export class FavouriteSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: props.favourites,
            name: "",
            id: ''
        };
    }

    onTrigger = () => {
        this.props.parentCallback({ name: this.state.name, id: this.state.id });
    };

    render() {
        return (
            <div>
                <div className="p-3">
                    <Autocomplete
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                this.setState({
                                    name: newValue,
                                });
                            } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                this.setState({
                                    name: newValue.inputValue,
                                });
                            } else {
                                this.setState(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option.name);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="favourite-select"
                        options={this.state.favourites}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Favourite List" />
                        )}
                    />
                </div>
                <div className="text-right">
                    <Button variant="contained" color="primary" onClick={this.onTrigger}>Save</Button>
                </div>
            </div>
        )
    };
}