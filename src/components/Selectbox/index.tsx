import React, { useState } from "react";

import { listItem } from "src/utils";

import "./style.css";

//                    interface                    //
interface Prop {
    value: string;
    onChange: (value: string) => void;
}

//                    component                    //
export default function SelectBox({ value, onChange }: Prop) {
    //                    state                    //
    const [name, setName] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    //                    event handler                    //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    const onItemClickHandler = (value: string) => {
        listItem.forEach((item) => {
            if (item.value === value) setName(item.name);
        });
        onChange(value);
        setShow(false);
    };

    //                    render                    //
    const buttonClass = show ? "select-close-button" : "select-open-button";
    return (
        <div className="select-box">
            {value === "" ? <div className="select-none">지역</div> : <div className="select-item">{name}</div>}
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && (
                <div className="select-list">
                    {listItem.map((item) => (
                        <div className="select-list-item-box" onClick={() => onItemClickHandler(item.value)}>
                            <div className="select-item">{item.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
