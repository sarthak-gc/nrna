import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Popover } from "antd";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #db4c40;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.onClick ? "pointer" : "default")};
    &:hover {
        z-index: 1;
    }
`;

const ListMarker = ({ text, onClick, business }) => {
    const popOverContent = (
        <div className="p-1">
            <h5 className="text-sm">{business.business_name}</h5>
        </div>
    );

    return (
        <Popover content={popOverContent}>
            <Wrapper alt={text} onClick={onClick} />
        </Popover>
    );
};

export default ListMarker;
