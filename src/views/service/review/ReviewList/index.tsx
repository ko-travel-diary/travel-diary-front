import Container from "src/layouts/Container";
import './style.css'
import { useNavigate } from "react-router";
import { ReviewBoardListItem } from "src/types";
import { COUNT_PER_PAGE, COUNT_PER_SECTION, REVIEW_ABSOULUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH, REVIEW_WRITE_ABSOLUTE_PATH } from "src/constant";
import { ChangeEvent, useEffect, useState } from "react";
import { getTravelReviewBoardRequest, getTravelReviewTitleAndContentSearchRequest, getTravelReviewWriteDateSearchRequest, getTravelReviewWriterSearchRequest } from "src/apis/review";
import { GetReviewTitleAndContentSearchRequestDto, GetReviewWriteDateSearchRequestDto, GetReviewWriterSearchRequestDto, GetTravelReviewBoardResponseDto } from "src/apis/review/dto/response";
import ResponseDto from "src/apis/response.dto";
import { useCookies } from "react-cookie";
import { useUserStore } from "src/stores";
import { useScheduleNumberStore } from "src/stores/useScheduleNumberStores";

//                    component                    //
function ListItem ({ 
    reviewNumber,
    reviewTitle,
    writerId,
    reviewDatetime,
    travelReviewImageUrl,
    reviewViewCount,
    reviewFavoriteCount,
}: ReviewBoardListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(REVIEW_DETAIL_ABSOLUTE_PATH(reviewNumber));

    //                    render                    //
    return (
        <div className='review-list-table-tr' onClick={onClickHandler}>
            {travelReviewImageUrl === null ? (
                <div className="travel-list-picture">
                    <img title="travel" width="200px" height="135px" src={`${"https://cdn-icons-png.flaticon.com/128/11423/11423562.png"}`} />
                </div>
            ) : (
                <div className="travel-list-picture">
                    <img title="travel" width="200px" height="135px" src={`${travelReviewImageUrl}`} />
                </div>
            )}
            <div className='review-list-table-title'>{reviewTitle}</div>
            <div className='review-list-table-writer'>{writerId}</div>
            <div className='review-list-table-write-date'>{reviewDatetime}</div>
            <div className='review-list-table-view-count'>{reviewViewCount}</div>
            <div className='review-list-table-favorite-count'>{reviewFavoriteCount}</div>
        </div>
    );
}

//                    Component : 리뷰 게시판 화면 컴포넌트                     //
export default function ReviewList () {

    //                    state                    //
    const [cookies] = useCookies();
    const { loginUserRole } = useUserStore();
    const [boardList, setBoardList] = useState<ReviewBoardListItem[]>([]);
    const [viewList, setViewList] = useState<ReviewBoardListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');
    const [searchButtonStatus, setSearchButtonStatus] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState<string>('writer');

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (boardList: ReviewBoardListItem[], totalLenght: number) => {
        if (!boardList || !Array.isArray(boardList) || boardList.length === 0) return;
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = boardList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeBoardList = (boardList: ReviewBoardListItem[]) => {
        setBoardList(boardList);

        const totalLenght = boardList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(boardList, totalLenght);

        changeSection(totalPage);
    };


    const getTravelReviewBoardResponse = (result: GetTravelReviewBoardResponseDto | ResponseDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '검색어를 입력하세요.' : 
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { reviewBoardList } = result as GetTravelReviewBoardResponseDto;
        changeBoardList(reviewBoardList);

        setCurrentPage(1);
        setCurrentSection(1);

    };

    const getTravelReviewTitleAndContentSearchResponse = (result: ResponseDto | GetReviewTitleAndContentSearchRequestDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const{ reviewSearchList } = result as GetReviewWriteDateSearchRequestDto;
        changeBoardList(reviewSearchList);

        if(reviewSearchList.length == 0) alert('검색 결과가 없습니다.');

        setCurrentPage(!boardList.length ? 0 : 1);
        setCurrentSection(!boardList.length ? 0 : 1);
    };
    
    const getTravelReviewWriteDateSearchResponse = (result: ResponseDto | GetReviewWriteDateSearchRequestDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '검색어를 입력하세요.' : 
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const{ reviewSearchList } = result as GetReviewWriteDateSearchRequestDto;
        changeBoardList(reviewSearchList);

        if(reviewSearchList.length == 0) alert('검색 결과가 없습니다.');

        setCurrentPage(!boardList.length ? 0 : 1);
        setCurrentSection(!boardList.length ? 0 : 1);
    };

    const getTravelReviewWriterSearchResponse = (result: ResponseDto | GetReviewWriterSearchRequestDto | null) => {
        const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '검색어를 입력하세요.' : 
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const{ reviewSearchList } = result as GetReviewWriteDateSearchRequestDto;
        changeBoardList(reviewSearchList);

        if(reviewSearchList.length === 0) alert('검색 결과가 없습니다.');

        setCurrentPage(!boardList.length ? 0 : 1);
        setCurrentSection(!boardList.length ? 0 : 1);
    };

    //                    event handler                    //
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    const onWriteButtonClickHandler = () => {
        if(!cookies.accessToken) {
            alert('로그인 후 이용해 주세요');
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        if (loginUserRole !== 'ROLE_USER') {
            alert('사용자가 아닙니다.');
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }
        navigator(REVIEW_WRITE_ABSOLUTE_PATH);
    };

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if(selectedOption === "writer")
            getTravelReviewWriterSearchRequest(searchWord).then(getTravelReviewWriterSearchResponse);
        
        if(selectedOption === "write-date")
            getTravelReviewWriteDateSearchRequest(searchWord).then(getTravelReviewWriteDateSearchResponse);
        
        if(selectedOption === "title-contents")
            getTravelReviewTitleAndContentSearchRequest(searchWord).then(getTravelReviewTitleAndContentSearchResponse);
        
    };

    //                    effect                    //
    useEffect(() => {
        getTravelReviewBoardRequest().then(getTravelReviewBoardResponse);
    }, []);

    useEffect(() => {
        if (!boardList.length) return;
        changePage(boardList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!boardList.length) return;
        changeSection(totalPage);
    }, [currentSection]);

    useEffect(() => {
        setSelectedOption(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        setSearchButtonStatus(!setSearchButtonStatus);
    }, [searchButtonStatus])

    //                    render                    //
    return (
        <div id="review-wrapper">

            <div className="review-search-wrapper">
                <div className="review-search-item">
                    <div className="review-search-item-writer font-size-color ">
                        <input name="check" type="radio" defaultChecked onChange={onRadioChangeHandler} value={"writer"} />
                        작성자
                    </div>
                    <div className="review-search-item-write-date font-size-color">
                    <input name="check" type="radio" onChange={onRadioChangeHandler} value={"write-date"}/>
                        작성일
                    </div>
                    <div className="review-search-item-title-contents font-size-color">
                        <input name="check" type="radio" onChange={onRadioChangeHandler} value={"title-contents"}/>
                        제목 + 내용
                    </div>
                </div>
                <div className="review-search-box">
                    <div className="review-search-input-box">
                        <input className="review-search-input" placeholder="검색어를 입력하세요." value={searchWord} onChange={onSearchWordChangeHandler} />
                    </div>
                    <div className="review-search-button primary-button" onClick={onSearchButtonClickHandler}>검색</div>
                </div>
                <div className="writebox">
                    <div className="review-write-button primary-button" onClick={onWriteButtonClickHandler}>글쓰기</div>
                </div>
            </div>

            <div className="review-list-table">
                <div className="review-list-table-th">
                    <div className="review-list-table-image">사진</div>
                    <div className="review-list-table-title">제목</div>
                    <div className="review-list-table-writer">작성자</div>
                    <div className="review-list-table-write-date">작성일</div>
                    <div className="review-list-table-view-count">조회수</div>
                    <div className="review-list-table-favorite-count">추천수</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>

            <div className="review-list-bottom">
                <div className='review-list-pagenation'>
                    <div className='review-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='review-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
                        <div className='review-list-page-active'>{page}</div> :
                        <div className='review-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='review-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    );
}
