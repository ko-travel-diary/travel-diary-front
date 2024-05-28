import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './style.css';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { travelReviewMyList } from 'src/types';
import { useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, REVIEW_DETAIL_ABSOLUTE_PATH, REVIEW_WRITE_ABSOLUTE_PATH } from 'src/constant';
import ResponseDto from 'src/apis/response.dto';
import { GetTravelReviewMyListResponseDto } from 'src/apis/review/dto/response';
import { getTravelReviewMyListRequest } from 'src/apis/review';

//                    Component : MY REVIEW LIST 화면 컴포넌트                     //
function ListItem(
    {
        reviewNumber,
        reviewTitle,
        reviewDatetime,
        reviewViewCount
    }: travelReviewMyList) {

    //                    state                     //

    //                     function                     //
    const navigator = useNavigate();

    //                     event handler                     //
    const onClickHandler = () => navigator(REVIEW_DETAIL_ABSOLUTE_PATH(reviewNumber));

    return (
        <div>
        <div className='myreview-list-table-list' onClick={onClickHandler}>
            <div className='myreview-list-reception-number'>{reviewNumber}</div>
            <div className='myreview-list-title' style={{textAlign : 'left'}}>{reviewTitle}</div>
            <div className='myreview-list-write-date'>{reviewDatetime}</div>
            <div className='myreview-list-view-count'>{reviewViewCount}</div>
        </div>
        </div>
    );
    };

    //                    Component : MY_REVIEW 화면 컴포넌트                     //
    export default function MyReviewList() {
    
    //                    state                     //
    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const [reviewList, setReviewList] = useState<travelReviewMyList[]>([]);
    const [viewList, setViewList] = useState<travelReviewMyList[]>([]);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');

    //                     function                     //
    const navigator = useNavigate();

    const changePage = (reviewList: travelReviewMyList[], totalLength: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if(endIndex > totalLength - 1) endIndex = totalLength;
        const viewList = reviewList.slice(startIndex, endIndex);
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

    const changeReivewList = (reviewList: travelReviewMyList[]) => {
    setReviewList(reviewList);

    const totalLength = reviewList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(reviewList, totalLength);
    
    changeSection(totalPage);
    };

    const getTravelReviewMyListResponse = (result: GetTravelReviewMyListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') navigator(AUTH_ABSOLUTE_PATH);
        return result;
        }

        const { travelReviewMyList } = result as GetTravelReviewMyListResponseDto;
        changeReivewList(travelReviewMyList);
        console.log(travelReviewMyList);

        setCurrentPage(!travelReviewMyList.length ? 0 : 1);
        setCurrentSection(!travelReviewMyList.length ? 0 : 1);
    };

    //                     event handler                     //
    const onWriteButtonClickHandler = () => {
        if(loginUserRole !== 'ROLE_USER') return;
        navigator(REVIEW_WRITE_ABSOLUTE_PATH);
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

    const onSearchWordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onPasswordKeydownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') return onSearchButtonClickHandler();
    };

    const onSearchButtonClickHandler = () => {
        if(!searchWord) return;
        if(!cookies.accessToken) return;
    };

    //                    effect                     //
    useEffect(() => {
        if(!cookies.accessToken) return;
            getTravelReviewMyListRequest(cookies.accessToken).then(getTravelReviewMyListResponse);
    }, [])

    // useEffect(() => {
    //     if(!cookies.accessToken || loginUserRole !== 'ROLE_ADMIN') return;
    //     getTravelReviewTitleAndContentSearchRequest(searchWord, cookies.accessToken).then(getTravelReviewTitleAndContentSearchResponse);
    // }, [])

    useEffect(() => {
        if(!reviewList.length) return;
        changePage(reviewList, totalLength);
    }, [currentPage])

    useEffect(() => {
        if(!reviewList.length) return;
        changeSection(totalPage);
    }, [currentSection])


    //                    render                     //
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';

    return (
        <div id='myreview-list-wrapper'>
            <div className='myreview-list-top'>
            <div className='myreview-list-top-left'>전체 <span className='emphasis'>{totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>

            <div className='myreview-list-table'>
                <div className='myreview-list-table-title'>
                    <div className='myreview-list-reception-number'>접수번호</div>
                    <div className='myreview-list-title'>제목</div>
                    <div className='myreview-list-write-date'>작성일</div>
                    <div className='myreview-list-view-count'>조회수</div>
                </div>
                { viewList.map(item => <ListItem {...item} />)}
            </div>

            <div className='myreview-list-bottom'>
            <div className='myreview-list-write-box' onClick={onWriteButtonClickHandler}>글쓰기</div>
            <div className='myreview-list-pagenation'>
                <div className='myreview-list-page-left' onClick={onPreSectionClickHandler}></div>
                <div className='myreview-list-page-box'>
                    {pageList.map(page => 
                    page === currentPage ?
                    <div className='myreview-list-page-active' key={page}>{page}</div> :
                    <div className='myreview-list-page' onClick={() => onPageClickHandler(page)} key={page}>{page}</div>
                    )}
                </div>
                <div className='myreview-list-page-right' onClick={onNextSectionClickHandler}></div>
            </div>

            <div className='myreview-list-bottom-right'>
                <div className='myreview-list-search-box'>
                <input className='myreview-list-search-input' placeholder='검색어를 입력해주세요.' value={searchWord} onChange={onSearchWordChangeHandler} onKeyDown={onPasswordKeydownHandler}></input>
                </div>
                <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
            </div>

        </div>
            
    </div>
    )}