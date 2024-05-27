import React, { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react'
import './style.css';
import SelectBox from 'src/components/Selectbox';
import { useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, RESTAURANT_ABSOULUTE_PATH, RESTAURANT_DETAIL_ABSOLUTE_PATH, TOURATTRACTIONS_ABSOULUTE_PATH, TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { ListItem, RestaurantListItem, TourAttractionsListItem } from 'src/types';
import { getSearchTourAttractionsListRequest, getTourAttractionsListRequest } from 'src/apis/tour_attraction';
import ResponseDto from 'src/apis/response.dto';
import { GetSearchTourAttractionsListResponseDto, GetTourAttractionsListResponseDto } from 'src/apis/tour_attraction/dto/response';
import { getRestaurantListRequest, getSearchRestaurantListRequest } from 'src/apis/restaurant';
import { GetRestaurantListResponseDto, GetSearchRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';

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
        navigator(TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH(tourAttractionsNumber));
    }

    return (
        <div className="travel-list-table" onClick={onClickHandler}>
                <div className='travel-list-table-th'>
                    {tourAttractionsImageUrl === null ?
                    <div className='travel-list-picture'><img title='travel' width='200px' height='133px' src={`${'https://cdn-icons-png.flaticon.com/128/11423/11423562.png'}`} /></div> :
                    <div className='travel-list-picture'><img title='travel' width='200px' src={`${tourAttractionsImageUrl}`} /></div>
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
function Restlist (
        {
            restaurantNumber,
            restaurantImageUrl,
            restaurantName,
            restaurantLocation,
            restaurantTelNumber,
            restaurantHours,
            restaurantOutline
        }: RestaurantListItem) {
    
        //                     function                     //
        const navigator = useNavigate();
    
        //                     event handler                     //
        const onClickHandler = () => {
            navigator(RESTAURANT_DETAIL_ABSOLUTE_PATH(restaurantNumber));
        }
    //                    Render : Qna 화면 컴포넌트                     //
        return (
            <div className="travel-list-table" onClick={onClickHandler}>
                    <div className='travel-list-table-th'>
                        {restaurantImageUrl === null ?
                        <div className='travel-list-picture'><img width='200px' height='135px' src={`${'https://cdn-icons-png.flaticon.com/128/11423/11423562.png'}`} /></div> :
                        <div className='travel-list-picture'><img width='200px' height='135px' src={`${restaurantImageUrl}`} /></div>
                        }
                        <div>
                            <div className='travel-list-table-title'>
                                <div className='travel-name'>
                                    <div className='travel-title'>이름</div>
                                    <div className='travel-detail-info-devider'>{'\|'}</div>
                                    <div className='travel-detail-info'>{restaurantName}</div>
                                </div>
                                <div className='travel-telNumber'>
                                <div className='travel-title'>연락처</div>
                                    <div className='travel-detail-info-devider'>{'\|'}</div>
                                    <div className='travel-detail-info'>{restaurantTelNumber}</div>
                                </div>
                            </div>
                            <div className='travel-list-table-title'>
                                <div className='travel-location'>
                                    <div className='travel-title'>지역</div>
                                    <div className='travel-detail-info-devider'>{'\|'}</div>
                                    <div className='travel-detail-info'>{restaurantLocation}</div>
                                </div>
                                <div className='travel-hours'>
                                    <div className='travel-title'>운영시간</div>
                                    <div className='travel-detail-info-devider'>{'\|'}</div>
                                    <div className='travel-detail-info'>{restaurantHours}</div>
                                </div>
                            </div >
                            <div className='travel-list-table-outline'>
                                <div className='travel-outline-text'>
                                    <div className='travel-title'>개요</div>
                                    <div className='travel-outline'>{restaurantOutline}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
        };

//                    Component : Qna 화면 컴포넌트                     //
export default function SearchTravelList() {
    
    //                    state                     //
    const [selectLocal, setSelectLocal] = useState<string>('');
    const [tourAttractionsListItem, setTourAttractionsListItem] = useState<TourAttractionsListItem[]>([]);
    const [restaurantListItem, setRestaurantListItem] = useState<RestaurantListItem[]>([]);
    const [tourViewList, setTourViewList] = useState<TourAttractionsListItem[]>([]);
    const [restViewList, setRestViewList] = useState<RestaurantListItem[]>([]);

    const [viewList, setViewList] = useState<ListItem[]>([]);

    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');
    const [searchButtonStatus, setSearchButtonStatus] = useState<boolean>(false);
    const [selectOption, setSelectOption] = useState<string>('tourAttractions');

    //                     function                     //
    const navigator = useNavigate();
    
    //                     event handler                     //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectOption(event.target.value);
    };

    const changeTourPage = (tourAttractionsListItem: TourAttractionsListItem[], totalLength: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if(endIndex > totalLength - 1) endIndex = totalLength;
        const tourViewList = tourAttractionsListItem.slice(startIndex, endIndex);
        setTourViewList(tourViewList);

        //TODO: 나중에 state 하나로 변경하기
        // const viewList: ListItem[] = tourViewList.map((v) => ({
        //     id: v.tourAttractionsNumber,
        //     imageUrl: v.tourAttractionsImageUrl,
        //     hours: v.tourAttractionsHours,
        //     location: v.tourAttractionsLocation,
        //     mainMenu: v.
        // }))
        // setViewList(viewList)
    };

    const changeTourList = (tourAttractionsListItem: TourAttractionsListItem[]) => {
        setTourAttractionsListItem(tourAttractionsListItem);
    
        const totalLength = tourAttractionsListItem.length;
        setTotalLength(totalLength);
    
        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
    
        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);
    
        changeTourPage(tourAttractionsListItem, totalLength);
        changeSection(totalPage);
    };

    const changeRestPage = (restaurantListItem: RestaurantListItem[], totalLength: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if(endIndex > totalLength - 1) endIndex = totalLength;
        const restViewList = restaurantListItem.slice(startIndex, endIndex);
        setRestViewList(restViewList);
    };

    const changeRestList = (restaurantListItem: RestaurantListItem[]) => {
        setRestaurantListItem(restaurantListItem);
    
        const totalLength = restaurantListItem.length;
        setTotalLength(totalLength);
    
        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
    
        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);
    
        changeRestPage(restaurantListItem, totalLength);
        changeSection(totalPage);
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

    const getTourAttractionsListResponse = (result: GetTourAttractionsListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

    const { tourAttractionsListItem } = result as GetTourAttractionsListResponseDto;
    changeTourList(tourAttractionsListItem);

    setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
    setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { restaurantListItem } = result as GetRestaurantListResponseDto;

        changeRestList(restaurantListItem);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const getSearchTourAttractionsListResponse = (result: GetSearchTourAttractionsListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { tourAttractionsListItem } = result as GetSearchTourAttractionsListResponseDto;

        let tourViewList = [];

        if(selectLocal !== 'all') {
            tourViewList = tourAttractionsListItem.filter((value) => {
                return value.tourAttractionsLocation.startsWith(selectLocal)
            });
        } else {
            tourViewList = tourAttractionsListItem;
        }

        changeTourList(tourViewList);

        setCurrentPage(!tourAttractionsListItem.length ? 0 : 1);
        setCurrentSection(!tourAttractionsListItem.length ? 0 : 1);
    };

    const getSearchRestaurantListResponse = (result: GetSearchRestaurantListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
            return result;
        }

        const { restaurantListItem } = result as GetRestaurantListResponseDto;

        let restViewList = [];

        if(selectLocal !== 'all') {
            restViewList = restaurantListItem.filter((value) => value.restaurantLocation.startsWith(selectLocal));
        } else {
            restViewList = restaurantListItem;
        }

        changeRestList(restViewList);

        setCurrentPage(!restaurantListItem.length ? 0 : 1);
        setCurrentSection(!restaurantListItem.length ? 0 : 1);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if(selectOption === "tourAttractions")
            getSearchTourAttractionsListRequest(searchWord).then(getSearchTourAttractionsListResponse);

        if(selectOption === "restaurant")
            getSearchRestaurantListRequest(searchWord).then(getSearchRestaurantListResponse);
    };

    const onPasswordKeydownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') return onSearchButtonClickHandler();
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

    useEffect(() => {
        getRestaurantListRequest().then(getRestaurantListResponse);
    }, [])

    useEffect(() => {
        setSelectOption(selectOption);
    }, [selectOption]);

    useEffect(() => {
        if(!tourAttractionsListItem.length) return;
        changeTourPage(tourAttractionsListItem, totalLength);
    }, [currentPage])
    
    useEffect(() => {
        if(!tourAttractionsListItem.length) return;
        changeSection(totalPage);
    }, [currentSection])

    useEffect(() => {
        if(!restaurantListItem.length) return;
        changeRestPage(restaurantListItem, totalLength);
    }, [currentPage])
    
    useEffect(() => {
        if(!restaurantListItem.length) return;
        changeSection(totalPage);
    }, [currentSection])

    useEffect(() => {
        setSearchButtonStatus(!setSearchButtonStatus);
    }, [searchButtonStatus])

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
                        <input name="check" type="radio" onChange={onRadioChangeHandler} defaultChecked value={"tourAttractions"} />관광명소</div>
                    <div className="review-search-item-restaurant travel-font ">
                        <input name="check" type="radio" onChange={onRadioChangeHandler} value={"restaurant"} />음식점</div>
                </div>
                <div className="travel-write-box">
                    <div className="travel-search-box">
                        <div className="travel-search-input-box">
                            <input className="travel-search-input" placeholder="검색어를 입력하세요." value={searchWord} onChange={onSearchWordChangeHandler} onKeyDown={onPasswordKeydownHandler}/>
                            <div className="travel-search-button primary-button" onClick={onSearchButtonClickHandler}>검색</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {selectOption === 'tourAttractions' && tourViewList.map(item => <Tourlist {...item} />)}
            {selectOption === 'restaurant' && restViewList.map(item => <Restlist {...item} />)}

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
