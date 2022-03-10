import { Button, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { FavouriteSelect } from "./favourite-select.component";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: "white",
        boxShadow: 5,
        padding: 10,
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCallback = (childData) => {
        childData.restaurant_id = props.restaurant.id;
        props.parentCallback(childData);
        handleClose();
    }

    return (
        <div>
            {props.restaurant?.favourite_restaurant ? (
                <div>
                    Favourited in
                    <b> {props.restaurant?.favourite_restaurant?.favourite?.name}</b>
                </div>
            ) : (
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Favourite
                </Button>
            )
            }

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h3 className="text-center">{props.restaurant.name}</h3>
                    <FavouriteSelect favourites={props.favourites} restaurant={props.restaurant} parentCallback={handleCallback} />
                </div>
            </Modal>
        </div >
    );
}