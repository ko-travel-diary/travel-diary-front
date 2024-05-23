import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './style.css';

export default function SearchTourList() {

    return (   
        <div id="review-wrapper">
            <div className="review-search-wrapper">
                <div className="review-search-box">
                    <div className="review-search-input-box">
                        <input className="review-search-input" placeholder="검색어를 입력하세요." />
                    </div>
                    <div className="review-search-button primary-button">검색</div>
                </div>
                <div className="writebox">
                    <div className="review-write-button primary-button">글쓰기</div>
                </div>
            </div>

            <div className="review-list-table">

            </div>

            <div className="review-list-bottom">
                <div className='review-list-pagenation'>
                    <div className='review-list-page-left'></div>
                    <div className='review-list-page-box'></div>
                </div>
            </div>
        </div>
);

}
