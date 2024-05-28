import React, { useEffect } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { MAIN_ABSOLUTE_PATH, MYPAGE_ABSOULUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { deleteUserRequest } from 'src/apis/user';
import { DeleteUserRequestDto } from 'src/apis/user/dto/request';

//                    Component : DELETE USER 화면 컴포넌트                     //
export default function deleteUser() {

    //                    state                     //
    const [cookies] = useCookies();

    //                     function                     //
    const navigator = useNavigate();
    
    //                     event handler                     //
    const onYesButtonClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);

    
    const deleteUserResponse = () => {
        
    }

    const onNoButtonClickHandler = () => {
        if(!cookies.accessToken) return;
        const isUserConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if(!isUserConfirm) return;

        // const requestBody: DeleteUserRequestDto = { userPassword: pass };
        
        // deleteUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse)

        navigator(MYPAGE_ABSOULUTE_PATH);
    };
    
    //                    effect                     //
    // useEffect(() => {
    //     const requestBody: DeleteUserRequestDto = { userPassword: userPassword };
    //     if(!requestBody) return;
    //     if(!cookies.accessToken) return;
    //     deleteUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse);
    // }, [])

    //                    render                     //
    return(
        <div id='delete-user-wrapper'>
            <div className='delete-user-box'>
                <div className='delete-user-box-top'>정말로 회원탈퇴 하시겠습니까?<br/>탈퇴하시려면 비밀번호를 입력해주세요.</div>
                <div className='delete-user-box-mid'>비밀번호 입력</div>
                <div className='delete-user-box-bottom'>
                    <div className='box-buttom-yes' onClick={onYesButtonClickHandler}>예</div>
                    <div className='box-buttom-no' onClick={onNoButtonClickHandler}>아니요</div>
                </div>
            </div>
        </div>
    )
}