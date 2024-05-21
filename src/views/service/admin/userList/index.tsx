import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { UserListItem } from 'src/types';
import { GetUserListResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useCookies } from 'react-cookie';
import { COUNT_PER_PAGE, COUNT_PER_SECTION } from 'src/constant';
import { getUserListRequest } from 'src/apis/user';

function UserListItems ({userId, userEmail}: UserListItem) {
    return (
        <div className='user-list-table-box'>
            <div className='user-list-table-number'>1</div>
            <div className='user-list-table-id'>{userId}</div>
            <div className='user-list-table-email'>{userEmail}</div>
            <div className='user-list-table-delete'>삭제</div>
        </div>
    )
}

//                  Component                   //
export default function UserList() {

    //                  state                  //
    const [cookies, setCookie] = useCookies();

    const [userList, setUserList] = useState<UserListItem[]>([]);
    const [viewList, setViewList] = useState<UserListItem[]>([]);

    const [totalLength, setTotalLength] = useState<number>(0);

    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageList, setPageList] = useState<number[]>([]);

    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [searchWord, setSearchWord] = useState<string>('');

    //                  event handler                   //
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page)
    }

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 2) * COUNT_PER_SECTION + 1);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    //                  function                    //
    const changePage = (userList: UserListItem[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength) endIndex = totalLength;
        const viewList = userList.slice(startIndex, endIndex);
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

    const changeUserList = (userList: UserListItem[]) => {
        setUserList(userList);

        const totalLength = userList.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1
        setTotalSection(totalSection);

        changePage(userList, totalLength);
        changeSection(totalPage);
    }

    const getUserListResponse = (result: GetUserListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { userListItem } = result as GetUserListResponseDto;
        if (!userListItem) {
            alert('유저 리스트를 불러오는데 실패했습니다.');
            return;
        }
        changeUserList(userListItem);

        setCurrentPage(!userListItem.length ? 0 : 1);
        setCurrentSection(!userListItem.length ? 0 : 1);
    };

    //                  effect                  //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getUserListRequest(cookies.accessToken).then(getUserListResponse)
    }, []);

    useEffect(() => {
        if (!userList.length) return;
        changePage(userList, totalLength);
    }, [currentPage])

    useEffect(() => {
        if (!userList.length) return;
        changeSection(totalPage)
    }, [currentSection])

    //                  Render                   //
    return (
        <div id='user-list-wrapper'>
            <div className='user-list-top'>
                <div className='user-list-count-text'>전체유저 | <span className='emphasis'>명</span></div>
            </div>
        
            <div className='user-list-table'>
                <div className='user-list-table-top'>
                    <div className='user-list-table-number'>유저번호</div>
                    <div className='user-list-table-id'>아이디</div>
                    <div className='user-list-table-email'>이메일</div>
                    <div className='user-list-table-delete'>삭제</div>
                </div>
                <div className='user-list-table-line'></div>
                {viewList.map(item => <UserListItems key={item.userId} {...item}/>)}
            </div>

            <div className='user-list-bottom'>
                <div className='user-list-bottom-left'></div>
                <div className='user-list-bottom-middle'>
                    <div className='user-list-pagenation'>
                        <div className='user-list-page-left' onClick={onPreSectionClickHandler}></div>
                        <div className='user-list-page-box'>
                        {pageList.map(page => 
                            page === currentPage ?
                            <div className='user-list-page-active' key={page}>{page}</div> :
                            <div className='user-list-page' key={page} onClick={() => onPageClickHandler(page)}>{page}</div>
                        )} 
                        </div>
                        <div className='user-list-page-right' onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className='user-list-bottom-right'>
                    <div className='user-list-search-box'>
                        <div className='user-list-search-input-box'>
                        <input className='user-list-search-input' placeholder='검색어를 입력하세요.'/>
                        </div>
                        <div className='primary-button'>검색</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
