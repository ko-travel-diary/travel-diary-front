import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import { UserListItem } from "src/types";
import ResponseDto from "src/apis/response.dto";
import { DeleteAdminUserRequestDto } from "src/apis/user/dto/request";
import { GetSearchUserListResponseDto, GetUserListResponseDto } from "src/apis/user/dto/response";
import { deleteAdminUserRequest, getSearchUserListRequest, getUserListRequest } from "src/apis/user";
import { AUTH_ABSOLUTE_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION } from "src/constant";

import "./style.css";
import { usePagination } from "src/hooks";

//                  Component                   //
function UserListItems({ userId, userEmail, joinDate, nickName }: UserListItem) {
    //                  State                   //
    const [cookies] = useCookies();

    //                  Function                    //
    const deleteUserResponse = (result: ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "NU"
            ? "존재하지 않는 유저입니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            return;
        }

        window.location.reload();
    };

    //                  Event Handler                   //
    const onDeleteClickHandler = () => {
        if (!cookies.accessToken) return;
        const confirm = window.confirm("해당 유저를 정말 삭제하시겠습니까?");
        if (!confirm) return;

        const requestBody: DeleteAdminUserRequestDto = { deleteToUserId: userId };

        deleteAdminUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse);
    };

    //                  Render                  //
    return (
        <div className="user-list-table-box">
            <div className="user-list-table-number">{joinDate}</div>
            <div className="user-list-table-id">{userId}</div>
            <div className="user-list-table-nickname">{nickName}</div>
            <div className="user-list-table-email">{userEmail}</div>
            <div className="user-list-table-delete error-button" onClick={onDeleteClickHandler}>
                삭제
            </div>
        </div>
    );
}

//                  Component                   //
export default function UserList() {
    //                  state                  //
    const [cookies] = useCookies();

    const [searchWord, setSearchWord] = useState<string>("");

    const {
        viewList,
        pageList,
        currentPage,
        boardCount,

        setCurrentPage,
        setCurrentSection,

        changeBoardList,

        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler
    } = usePagination<UserListItem>();

    //                  function                    //
    const navigator = useNavigate();

    const getUserListResponse = (result: GetUserListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다"
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { userListItem } = result as GetUserListResponseDto;
        changeBoardList(userListItem);

        setCurrentPage(!userListItem.length ? 0 : 1);
        setCurrentSection(!userListItem.length ? 0 : 1);
    };

    const getSearchUserListResponse = (result: GetSearchUserListResponseDto | ResponseDto | null) => {
        const message = !result
            ? "서버에 문제가 있습니다."
            : result.code === "VF"
            ? "검색어를 입력하세요."
            : result.code === "AF"
            ? "인증에 실패했습니다."
            : result.code === "DBE"
            ? "서버에 문제가 있습니다."
            : "";

        if (!result || result.code !== "SU") {
            alert(message);
            if (result?.code === "AF") navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { searchUserListItem } = result as GetSearchUserListResponseDto;
        changeBoardList(searchUserListItem);

        setCurrentPage(!searchUserListItem.length ? 0 : 1);
        setCurrentSection(!searchUserListItem.length ? 0 : 1);
    };

    //                  event handler                   //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    const onSearchButtonClickHandler = () => {
        if (!searchWord) return;
        if (!cookies.accessToken) return;

        getSearchUserListRequest(searchWord, cookies.accessToken).then(getSearchUserListResponse);
    };

    const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return onSearchButtonClickHandler();
    };

    //                  effect                  //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getUserListRequest(cookies.accessToken).then(getUserListResponse);
    }, []);

    //                  Render                   //
    return (
        <div id="user-list-wrapper">
            <div className="user-list-top">
                <div className="user-list-count-text">
                    전체유저 | <span className="emphasis">{boardCount}명</span>
                </div>
            </div>

            <div className="user-list-table">
                <div className="user-list-table-top">
                    <div className="user-list-table-number">가입일</div>
                    <div className="user-list-table-id">아이디</div>
                    <div className="user-list-table-nickname">닉네임</div>
                    <div className="user-list-table-email">이메일</div>
                    <div className="user-list-table-delete">삭제</div>
                </div>
                <div className="user-list-table-line"></div>
                {viewList.map((item) => (
                    <UserListItems key={item.userId} {...item} />
                ))}
            </div>

            <div className="user-list-bottom">
                <div className="user-list-bottom-left"></div>
                <div className="user-list-bottom-middle">
                    <div className="user-list-pagenation">
                        <div className="user-list-page-left" onClick={onPreSectionClickHandler}></div>
                        <div className="user-list-page-box">
                            {pageList.map((page) =>
                                page === currentPage ? (
                                    <div className="user-list-page-active" key={page}>
                                        {page}
                                    </div>
                                ) : (
                                    <div className="user-list-page" key={page} onClick={() => onPageClickHandler(page)}>
                                        {page}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="user-list-page-right" onClick={onNextSectionClickHandler}></div>
                    </div>
                </div>
                <div className="user-list-bottom-right">
                    <div className="user-list-search-box">
                        <div className="user-list-search-input-box">
                            <input
                                className="user-list-search-input"
                                placeholder="아이디로 검색."
                                value={searchWord}
                                onChange={onSearchWordChangeHandler}
                                onKeyDown={onEnterKeyDownHandler}
                            />
                        </div>
                        <div className="primary-button" onClick={onSearchButtonClickHandler}>
                            검색
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
