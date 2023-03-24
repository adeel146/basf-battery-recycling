import React, {useEffect} from "react";

import {
    getServiceType,
} from "../../../common/utils/Utilities";
import OrderAssignments from "./OrderAssignments";
import PackagingAssignments from "./PackagingAssignments";

const Assignments = () => {
    useEffect(() => {
        window._paq.push(["setUserId", localStorage.getItem("email")]);
        window._paq.push(["trackPageView"]);
    },[]);
    if (getServiceType() === "packaging") {
        return (<PackagingAssignments/>)
    } else {
        return (<OrderAssignments/>);
    }
};

export default Assignments;
