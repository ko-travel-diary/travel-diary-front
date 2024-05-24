import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { AUTH_ABSOLUTE_PATH, QNA_ABSOLUTE_PATH, QNA_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { PostQnaRequestDto } from 'src/apis/qna/dto/request';
import { postQnaRequest } from 'src/apis/qna';

//                    Component : Qna 화면 컴포넌트                     //
export default function QnaWrite() {

    //                    state                     //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);

    const { loginUserRole } = useUserStore();

    const [cookies] = useCookies();

    const[qnaTitle, setQnaTitle] = useState<string>('');
    const[qnaContent, setQnaContent] = useState<string>('');

    //                     function                     //
    const navigator = useNavigate();

    const PostQnaResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }
        
        alert('작성이 완료되었습니다.');
        navigator(QNA_ABSOLUTE_PATH);
    };

  //                     event handler                     //
    const onQnaTitleChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        const qnaTitle = event.target.value;
        setQnaTitle(qnaTitle);
    };

    const onQnaContentsChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        const qnaContent = event.target.value;
        if(qnaContent.length > 1000) return;
        setQnaContent(qnaContent);

        if(!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`
    };

    const onPostButtonClickHandler = () => {
        if(!qnaTitle.trim() || !qnaContent.trim()) return;
        if(!cookies.accessToken) return;

        const requestBody: PostQnaRequestDto = { qnaTitle, qnaContent };
    
        postQnaRequest(requestBody, cookies.accessToken).then(PostQnaResponse);
    };

//                   effect                        //
    useEffect(() => {
        if(loginUserRole === 'ROLE_ADMIN') {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
    }
}, [loginUserRole]);

  //                    render : QnA 화면 컴포넌트                     //
    return (
        <div id="qna-write-wrapper">
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>
                    <input className='qna-write-title-input' placeholder='제목을 입력해주세요. / 30자' maxLength={30} value={qnaTitle} onChange={onQnaTitleChangeHandler} />
                </div>
            </div>
            <div className='qna-write-contents-box'>
                <textarea ref={contentsRef} className='qna-write-contents-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} value={qnaContent} onChange={onQnaContentsChangeHandler} />
            </div>
            <div className='qna-write-bottom'>
            <div style={{width: '250px'}}></div>
            <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
            </div>
        </div>

    );
}