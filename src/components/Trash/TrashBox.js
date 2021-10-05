import React, { forwardRef, useState} from "react";
import { faCheck, faList, faPlus, faThumbtack, faTrash, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import axios from "axios";

function TrashBox({id, title, noTitle, registerDt}) {
    const baseUrl = "http://localhost:8080";

    return <div className="trashBox">

    </div>;
}

TrashBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    noTitle: PropTypes.bool,
    registerDt: PropTypes.string
};

export default TrashBox;