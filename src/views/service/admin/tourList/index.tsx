import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { TourAttractionsListItem } from 'src/types';
import { useCookies } from 'react-cookie';
import { ADMINPAGE_TOUR_ADD_ABSOLUTE_PATH, AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION } from 'src/constant';
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto } from 'src/apis/tour_attraction/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import { getSearchTourAttractionsListRequest, getTourAttractionsListRequest } from 'src/apis/tour_attraction';

//                  Component                   //
export function TourListItems ({tourAttractionsImageUrl, tourAttractionsName, tourAttractionsLocation, tourAttractionsTelNumber, tourAttractionsHours}: TourAttractionsListItem) {
    
    //                  Render                  //
    return (
        <div className='tour-list-table-box'>
            {tourAttractionsImageUrl === null ?
                <div className='tour-list-table-image'><img width='75px' height='50px' src={`${'https://cdn-icons-png.flaticon.com/128/11423/11423562.png'}`} /></div> :
                <div className='tour-list-table-image'><img width='75px' height='50px' src={`${tourAttractionsImageUrl}`} /></div>
            }
            <div className='tour-list-table-name long-text'>{tourAttractionsName}</div>
            <div className='tour-list-table-locate long-text'>{tourAttractionsLocation}</div>
            <div className='tour-list-table-tel long-text'>{tourAttractionsTelNumber}</div>
            <div className='tour-list-table-hours long-text'>{tourAttractionsHours}</div>
        </div>
    )
}

//                  Component                   //
export default function TourList() {

    //                  state                  //
    const [cookies] = useCookies();

    const [tourList, setTourList] = useState<TourAttractionsListItem[]>([]);
    const [viewList, setViewList] = useState<TourAttractionsListItem[]>([]);

    const [totalLength, setTotalLength] = useState<number>(0);

    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageList, setPageList] = useState<number[]>([]);

    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [tourCount, setTourCount] = useState<number>(0);

    const [searchWord, setSearchWord] = useState<string>('');

    //                  function                    //
    const navigator = useNavigate();

    const changePage = (tourList: TourAttractionsListItem[], totalLength: number) => {
        if (!tourList || !Array.isArray(tourList) || tourList.length === 0) return;
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength) endIndex = totalLength;
        const viewList = tourList.slice(startIndex, endIndex);
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

    const changeTourList = (tourList: TourAttractionsListItem[]) => {
        setTourList(tourList);

        const totalLength = tourList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(tourList, totalLength);
        changeSection(totalPage);

        setTourCount(totalLength);
    };

    const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const {tourAttractionsListItem} = result as GetTourAttractionsListResponseDto;
        changeTourList(tourAttractionsListItem);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getSearchTourListResponse = (result: GetSearchTourAttractionsListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        if (!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const {tourAttractionsListItem} = result as GetSearchTourAttractionsListResponseDto;
        changeTourList(tourAttractionsListItem);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    }

    //                  Event handler                   //
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
        
        getSearchTourAttractionsListRequest(searchWord).then(getSearchTourListResponse);
    }

    const onRegisterButtonClickHandler = () => {
        if (!cookies.accessToken) return;

        navigator(ADMINPAGE_TOUR_ADD_ABSOLUTE_PATH);
    }

    //                  effect                  //
    useEffect(() => {
        getTourAttractionsListRequest().then(getTourAttractionsListResponse)
    }, []);

    useEffect(() => {
        if (!tourList.length) return;
        changePage(tourList, totalLength);
    }, [currentPage])

    useEffect(() => {
        if (!tourList.length) return;
        changeSection(totalPage)
    }, [currentSection])

    //                  Render                   //
    return (
        <div id='tour-list-wrapper'>
            <div className='tour-list-top'>
                <div className='tour-list-count-text'>전체 관광지수 | <span className='emphasis'>{tourCount}명</span></div>
                <div className='tour-list-add-button primary-button' onClick={onRegisterButtonClickHandler}>등록</div>
            </div>
        
            <div className='tour-list-table'>
                <div className='tour-list-table-top'>
                    <div className='tour-list-table-image'>사진</div>
                    <div className='tour-list-table-name'>이름</div>
                    <div className='tour-list-table-locate'>장소</div>
                    <div className='tour-list-table-tel'>연락처</div>
                    <div className='tour-list-table-hours'>시간</div>
                </div>
                <div className='tour-list-table-line'></div>
                {viewList.map(item => <TourListItems {...item}/>)}
            </div>

            <div className='tour-list-bottom'>
                <div className='tour-list-bottom-left'></div>
                <div className='tour-list-bottom-middle'>
                    <div className='tour-list-pagenation'>
                        <div className='tour-list-page-left' onClick={onPreSectionClickHandler}></div>
                        <div className='tour-list-page-box'>
                        {pageList.map(page => 
                            page === currentPage ?
                            <div className='tour-list-page-active' key={page}>{page}</div> :
                            <div className='tour-list-page' key={page} onClick={() => onPageClickHandler(page)}>{page}</div>
                        )} 
                        </div>
                        <div className='tour-list-page-right' onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className='tour-list-bottom-right'>
                    <div className='tour-list-search-box'>
                        <div className='tour-list-search-input-box'>
                        <input className='tour-list-search-input' placeholder='관광명소명으로 검색' value={searchWord} onChange={onSearchWordChangeHandler}/>
                        </div>
                        <div className='primary-button' onClick={onSearchButtonClickHandler}>검색</div>
                    </div>
                </div>
            </div>
        </div>
    )
}