import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './style.css';
import SelectBox from 'src/components/Selectbox';
import { useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, TOURATTRACTIONS_ABSOULUTE_PATH, TOURATTRACTIONS_DETAIL_ABSOULUTE_PATH } from 'src/constant';
import { TourAttractionsListItem } from 'src/types';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { getTourAttractionsListRequest } from 'src/apis/tour_attraction';
import ResponseDto from 'src/apis/response.dto';
import { GetTourAttractionsListResponseDto } from 'src/apis/tour_attraction/dto/response';

//                    Component : Qna 화면 컴포넌트                     //
function Tourlist (
    {
        tourAttractionsNumber,
        tourAttractionsImageUrl,
        tourAttractionsName,
        tourAttractionsLocation,
        tourAttractionsTelNumber,
        tourAttractionsHours,
        tourAttractionsOutline
    }: TourAttractionsListItem) {

    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //

    const onClickHandler = () => {
        console.log(tourAttractionsNumber)
        navigator(TOURATTRACTIONS_DETAIL_ABSOULUTE_PATH(tourAttractionsNumber));
    }

    return (
        <div className="travel-list-table" onClick={onClickHandler}>
                <div className='travel-list-table-th'>
                    {tourAttractionsImageUrl === null ?
                    <div className='travel-list-picture'><img width='200px' height='133px' src={`${'https://cdn-icons-png.flaticon.com/128/11423/11423562.png'}`} /></div> :
                    <div className='travel-list-picture'><img width='200px' src={`${tourAttractionsImageUrl}`} /></div>
                    }
                    <div>
                        <div className='travel-list-table-title'>
                            <div className='travel-name'>
                                <div className='travel-title'>이름</div>
                                <div className='travel-detail-info-devider'>{'\|'}</div>
                                <div className='travel-detail-info'>{tourAttractionsName}</div>
                            </div>
                            <div className='travel-telNumber'>
                            <div className='travel-title'>연락처</div>
                                <div className='travel-detail-info-devider'>{'\|'}</div>
                                <div className='travel-detail-info'>{tourAttractionsTelNumber}</div>
                            </div>
                        </div>
                        <div className='travel-list-table-title'>
                            <div className='travel-location'>
                                <div className='travel-title'>지역</div>
                                <div className='travel-detail-info-devider'>{'\|'}</div>
                                <div className='travel-detail-info'>{tourAttractionsLocation}</div>
                            </div>
                            <div className='travel-hours'>
                                <div className='travel-title'>운영시간</div>
                                <div className='travel-detail-info-devider'>{'\|'}</div>
                                <div className='travel-detail-info'>{tourAttractionsHours}</div>
                            </div>
                        </div >
                        <div className='travel-list-table-outline'>
                            <div className='travel-outline-text'>
                                <div className='travel-title'>개요</div>
                                <div className='travel-outline'>{tourAttractionsOutline}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    };

//                    Component : Qna 화면 컴포넌트                     //
export default function SearchTourList() {
    
    //                    state                     //
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [selectLocal, setSelectLocal] = useState<string>('');
    const [tourAttractionsListItem, setTourAttractionsListItem] = useState<TourAttractionsListItem[]>([]);
    const [viewList, setViewList] = useState<TourAttractionsListItem[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const[searchWord, setSearchWord] = useState<string>('');

    //                     function                     //
    const navigator = useNavigate();
    
    //                     event handler                     //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const changePage = (tourAttractionsListItem: TourAttractionsListItem[], totalLength: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if(endIndex > totalLength - 1) endIndex = totalLength;
        const viewList = tourAttractionsListItem.slice(startIndex, endIndex);
        setViewList(viewList);
    };
    
    const changeSection = (totalPage: number) => {
        if(!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1));
        let endPage = currentSection * COUNT_PER_SECTION;
        if(endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for(let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeTourList = (tourAttractionsListItem: TourAttractionsListItem[]) => {
        setTourAttractionsListItem(tourAttractionsListItem);
    
        const totalLength = tourAttractionsListItem.length;
        setTotalLength(totalLength);
    
        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
    
        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);
    
        changePage(tourAttractionsListItem, totalLength);
        changeSection(totalPage);
    };

    const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return;
    }

    const { tourAttractionsListItem } = result as GetTourAttractionsListResponseDto;
    changeTourList(tourAttractionsListItem);

    setCurrentPage(1);
    setCurrentSection(1);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };
    
    const onPreSectionClickHandler = () => {
        if(currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection-1) * COUNT_PER_SECTION);
    };
    
    const onNextSectionClickHandler = () => {
        if(currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //                    effect                     //
    useEffect(() => {
        getTourAttractionsListRequest().then(getTourAttractionsListResponse);
    }, [])

    //                    render : QnA 화면 컴포넌트                     //
    return (   
        <div id="travelList-wrapper">
            <div className="travel-search-list">
                <div className='travel-search-location'>
                    <div>지역</div>
                    <div>{'\|'}</div>
                    <SelectBox value={selectLocal} onChange={onLocalChangeHandler} />
                </div>
                <div className='travel-search-category'>
                    <div>카테고리</div>
                    <div>{'\|'}</div>
                    <div className="review-search-item-travel-attraction travel-font ">
                        <input name="check" type="radio" />관광명소</div>
                    <div className="review-search-item-restaurant travel-font ">
                        <input name="check" type="radio" />음식점</div>
                </div>
                <div className="travel-write-box">
                    <div className="travel-search-box">
                        <div className="travel-search-input-box">
                            <input className="travel-search-input" placeholder="검색어를 입력하세요." />
                            <div className="travel-search-button primary-button">검색</div>
                        </div>
                    </div>
                </div>
            </div>
            {viewList.map(item => <Tourlist {...item} />)}

            <div className="travel-list-bottom">
            <div className='travel-list-pagenation'>
                <div className='travel-list-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='travel-list-page-box'>
                {pageList.map(page => 
                    page === currentPage ?
                    <div className='travel-list-page-active' key={page}>{page}</div> :
                    <div className='travel-list-page' onClick={() => onPageClickHandler(page)} key={page}>{page}</div>
                    )}
                </div>
                <div className='travel-list-page-right' onClick={onNextSectionClickHandler}></div>
            </div>

        </div>

    </div>
);

}
