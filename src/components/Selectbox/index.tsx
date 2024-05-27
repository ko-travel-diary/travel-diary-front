import React, { useState } from "react";
import './style.css';

interface Prop {
    value: string;
    onChange: (value: string) => void;
}

//                    component                    //
export default function SelectBox({ value, onChange }: Prop) {

    const listItem = [
        { name: '전국' , value: 'all' },
        { name: '서울' , value: '서울' },
        { name: '부산' , value: '부산' },
        { name: '대구' , value: '대구' },
        { name: '인천' , value: '인천' },
        { name: '광주' , value: '광주' },
        { name: '대전' , value: '대전' },
        { name: '울산' , value: '울산' },
        { name: '경기도' , value: '경기도' },
    ];

    //                    state                    //
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    //                    event handler                    //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    const onItemClickHandler = (value: string) => {
        listItem.forEach(item => {
            if (item.value === value) setName(item.name);
        });
        onChange(value);
        setShow(false);
    };

    //                    render                    //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
        <div className='select-box'>
            { value === '' ? 
            <div className='select-none'>지역</div> :
            <div className='select-item'>{name}</div>
            }
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && 
            <div className='select-list'>
                {listItem.map((item) => 
                <div className='select-list-item-box' onClick={() => onItemClickHandler(item.value)}>
                    <div className='select-item'>{item.name}</div>
                </div>
                )}
            </div>
            }
        </div>
    );
}