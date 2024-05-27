import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { RestaurantListItem } from 'src/types'
import { useCookies } from 'react-cookie';
import { ADMINPAGE_REST_ADD_ABSOLUTE_PATH, ADMINPAGE_REST_CONTROL_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, RESTAURANT_DETAIL_ABSOULUTE_PATH } from 'src/constant';
import { GetRestaurantListResponseDto, GetSearchRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { getRestaurantListRequest, getSearchRestaurantListRequest } from 'src/apis/restaurant';

//                  Component                    //
export function RestListItems ({restaurantNumber, restaurantImageUrl, restaurantName, restaurantLocation, restaurantTelNumber, restaurantHours}: RestaurantListItem) {

    //                  Function                    //
    const navigator = useNavigate();

    //                  Event Handler`                  //
    const onControlButton = () => {
        navigator(ADMINPAGE_REST_CONTROL_ABSOLUTE_PATH(restaurantNumber));
    }

    const onRestaurantListClickHandler = () => {
        navigator(RESTAURANT_DETAIL_ABSOULUTE_PATH(restaurantNumber));
    }

    //                  Render                  //
    return (
        <div className='rest-list-table-box'>
            <div className='rest-list-table-number'>{restaurantNumber}</div>
            {restaurantImageUrl === null ?
                <div className='rest-list-table-image'><img width='75px' height='50px' src={`${'https://cdn-icons-png.flaticon.com/128/11423/11423562.png'}`} /></div> :
                <div className='rest-list-table-image'><img width='75px' height='50px' src={`${restaurantImageUrl}`} /></div>
            }
            <div className='rest-list-table-name long-text' onClick={onRestaurantListClickHandler}>{restaurantName}</div>
            <div className='rest-list-table-locate long-text'>{restaurantLocation}</div>
            <div className='rest-list-table-tel long-text'>{restaurantTelNumber}</div>
            <div className='rest-list-table-hours long-text'>{restaurantHours}</div>
            <div className='control-button' onClick={onControlButton}>관리</div>
        </div>
    );
}

//                  Component                    //
export default function RestList() {

    //                  State                   //
    const [cookies] = useCookies();

    const [restList, setRestList] = useState<RestaurantListItem[]>([]);
    const [viewList, setViewList] = useState<RestaurantListItem[]>([]);

    const [totalLength, setTotalLength] = useState<number>(0);

    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageList, setPageList] = useState<number[]>([]);

    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [restCount, setRestCount] = useState<number>(0);

    const [searchWord, setSearchWord] = useState<string>('');

    //                  Function                   //
    const navigator = useNavigate();

    const changePage = (restList: RestaurantListItem[], totalLength: number) => {
        if (!restList || !Array.isArray(restList) || restList.length === 0) return;
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength) endIndex = totalLength;
        const viewList = restList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page ++) pageList.push(page);
        setPageList(pageList);
    };

    const changeRestList = (restList: RestaurantListItem[]) => {
        setRestList(restList);

        const totalLength = restList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(restList, totalLength);
        changeSection(totalPage);

        setRestCount(totalLength);
    };

    const getRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const {restaurantListItem} = result as GetRestaurantListResponseDto;
        changeRestList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const getSearchRestaurantListResopnse = (result: GetSearchRestaurantListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'VF' ? '데이터 유효성 검사 실패' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const {restaurantListItem} = result as GetSearchRestaurantListResponseDto;
        changeRestList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    }

    //                  Event Handler                   //
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page)
    }

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION)
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1)
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    }

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;
        
        getSearchRestaurantListRequest(searchWord).then(getSearchRestaurantListResopnse);
    }

    const onRegisterButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        navigator(ADMINPAGE_REST_ADD_ABSOLUTE_PATH);
    }

    //                  Effect                  //
    useEffect(() => {
        getRestaurantListRequest().then(getRestaurantListResponse)
    }, []);

    useEffect(() => {
        if (!restList.length) return;
        changePage(restList, totalLength);
    }, [currentPage])

    useEffect(() => {
        if (!restList.length) return;
        changeSection(totalPage)
    }, [currentSection])

    //                  Render                  //
    return (
        <div id='rest-list-wrapper'>
            <div className='rest-list-top'>
                <div className='rest-list-count-text'>전체 음식점수 | <span className='emphasis'>{restCount}명</span></div>
                <div className='rest-list-controll-box'>
                    <div className='rest-list-add-button primary-button' onClick={onRegisterButtonClickHandler}>등록</div>
                </div>
            </div>
        
            <div className='rest-list-table'>
                <div className='rest-list-table-top'>
                    <div className='rest-list-table-number'>번호</div>
                    <div className='rest-list-table-image'>사진</div>
                    <div className='rest-list-table-name'>이름</div>
                    <div className='rest-list-table-locate'>장소</div>
                    <div className='rest-list-table-tel'>연락처</div>
                    <div className='rest-list-table-hours'>시간</div>
                    <div className='rest-list-table-button'>관리</div>
                </div>
                <div className='rest-list-table-line'></div>
                {viewList.map(item => <RestListItems {...item}/>)}
            </div>

            <div className='rest-list-bottom'>
                <div className='rest-list-bottom-left'></div>
                <div className='rest-list-bottom-middle'>
                    <div className='rest-list-pagenation'>
                        <div className='rest-list-page-left' onClick={onPreSectionClickHandler}></div>
                        <div className='rest-list-page-box'>
                        {pageList.map(page => 
                            page === currentPage ?
                            <div className='rest-list-page-active' key={page}>{page}</div> :
                            <div className='rest-list-page' key={page} onClick={() => onPageClickHandler(page)}>{page}</div>
                        )} 
                        </div>
                        <div className='rest-list-page-right' onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className='rest-list-bottom-right'>
                    <div className='rest-list-search-box'>
                        <div className='rest-list-search-input-box'>
                        <input className='rest-list-search-input' placeholder='음식점명으로 검색' value={searchWord} onChange={onSearchWordChangeHandler}/>
                        </div>
                        <div className='primary-button' onClick={onSearchButtonClickHandler}>검색</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
