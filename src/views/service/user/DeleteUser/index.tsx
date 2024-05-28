import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { MAIN_ABSOLUTE_PATH, MYPAGE_ABSOULUTE_PATH, MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE, PROFILE_UPDATE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { deleteUserRequest } from 'src/apis/user';
import { DeleteUserRequestDto } from 'src/apis/user/dto/request';
import ResponseDto from 'src/apis/response.dto';

//                    Component : DELETE USER 화면 컴포넌트                     //
export default function DeleteUser() {

    //                    state                     //
    const [cookies] = useCookies();
    const [password, setPassword] = useState<string>('');

    //                     function                     //
    const navigator = useNavigate();
    
    //                     event handler                     //
    const onNoButtonClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);

    const deleteUserResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NU' ? '존재하지 않는 아이디입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            return;
        }
    }

    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setPassword(password);
    };

    const onYesButtonClickHandler = () => {
        if(!cookies.accessToken) return;
        const isUserConfirm = window.confirm('삭제가 완료되었습니다.');
        if(!isUserConfirm) return;

        const requestBody: DeleteUserRequestDto = { userPassword: password };

        if(!requestBody) return;
        if(!cookies.accessToken) return;
        deleteUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse)

        navigator(MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE);
    };
    
    //                    effect                     //
    // useEffect(() => {
    //     const requestBody: DeleteUserRequestDto = { userPassword: password };
    //     if(!requestBody) return;
    //     if(!cookies.accessToken) return;
    //     deleteUserRequest(requestBody, cookies.accessToken).then(deleteUserResponse);
    // }, [])

    //                    render                     //
    return(
        <div id='delete-user-wrapper'>
            <div className='delete-user-box'>
                <div className='delete-user-box-top'>정말로 회원탈퇴 하시겠습니까?<br/>탈퇴하시려면 비밀번호를 입력해주세요.</div>
                <div className='delete-user-box-mid'>
                    <input className='delete-password-box' type='password' value={password} onChange={onPasswordChangeHandler} placeholder='비밀번호 입력'/>
                </div>
                <div className='delete-user-box-bottom'>
                    <div className='box-buttom-yes' onClick={onYesButtonClickHandler}>예</div>
                    <div className='box-buttom-no' onClick={onNoButtonClickHandler}>아니요</div>
                </div>
            </div>
        </div>
    )
}