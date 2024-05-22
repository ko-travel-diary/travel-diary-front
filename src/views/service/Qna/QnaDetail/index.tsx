import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { GetQnaResponseDto } from 'src/apis/qna/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { AUTH_ABSOLUTE_PATH, QNA_ABSOLUTE_PATH, QNA_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { deleteQnaCommentRequest, deleteQnaRequest, getQnaRequest, postQnaCommentRequest } from 'src/apis/qna';
import { PostQnaCommentRequestDto } from 'src/apis/qna/dto/request';
import { access } from 'fs';

//                    Component : Qna 화면 컴포넌트                     //
export default function QnaDetail() {

  //                    state                     //
  const { loginUserId, loginUserRole } = useUserStore();
  const { receptionNumber } = useParams();

  const [cookies] = useCookies();
  const [qnaTitle, setQnaTitle] = useState<string>('');
  const [qnaWriterId, setQnaWriterId] = useState<string>('');
  const [qnaDatetime, setQnaWriteDate] = useState<string>('');
  const [qnaContent, setQnaContent] = useState<string>('');
  const [qnaStatus, setQnaStatus] = useState<boolean>(false);
  const [qnaComment, setQnaComment] = useState<string | null>(null);
  const [qnaCommentRows, setQnaCommentRows] = useState<number>(1);

  //                     function                     //
  const navigator = useNavigate();

    const getQnaResponse = (result : GetQnaResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            if(result?.code === 'AF') {
                navigator(AUTH_ABSOLUTE_PATH);
                return;
            }
            navigator(QNA_ABSOLUTE_PATH);
            return;
        }

        const { qnaTitle, qnaWriterId, qnaDatetime, qnaContent, qnaStatus, qnaComment } = result as GetQnaResponseDto;
        setQnaTitle(qnaTitle);
        setQnaWriterId(qnaWriterId);
        setQnaWriteDate(qnaDatetime);
        setQnaContent(qnaContent);
        setQnaStatus(qnaStatus);
        setQnaComment(qnaComment);
    };

    const postQnaCommentResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'WC' ? '이미 답글이 작성된 게시글입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if(!receptionNumber || !cookies.accessToken) return;
        getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
    };

    const deleteQnaResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if(!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        navigator(QNA_ABSOLUTE_PATH);
    };

    const deleteQnaCommentResponse = (result: ResponseDto | null) => {
      const message =
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'AF' ? '권한이 없습니다.' :
          result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
          result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if(!result || result.code !== 'SU') {
          alert(message);
          return;
        }
  };

  //                     event handler                     //
  const onCommentChangeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
    if(qnaStatus || loginUserRole !== "ROLE_ADMIN") return;
    const qnaComment = event.target.value;
    setQnaComment(qnaComment);
    const qnaCommentRows = qnaComment.split('\n').length;
    setQnaCommentRows(qnaCommentRows);
  };

  const onCommentSubmitClickHandler = () => {
    if(!qnaComment || !qnaComment.trim() || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
    if(!receptionNumber) return;

    const requestBody: PostQnaCommentRequestDto = { qnaComment };
    postQnaCommentRequest(requestBody, receptionNumber, cookies.accessToken).then();
};

  const onListClickHandler = () => {
    navigator(QNA_ABSOLUTE_PATH);
  };

  const onUpdateQnaClickHandler = () => {
    if(!receptionNumber) return;
    navigator(QNA_UPDATE_ABSOLUTE_PATH(receptionNumber));
  };

  const onUpdateCommentClickHandler = () => {
    if(!receptionNumber || loginUserRole !== "ROLE_ADMIN") return;
  };

  const onDeleteQnaClickHandler = () => {
    if(!receptionNumber || loginUserId !== qnaWriterId || qnaStatus || !cookies.accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if(!isConfirm) return;
    
    deleteQnaRequest(receptionNumber, cookies.accessToken).then(deleteQnaResponse)
  };

  const onDeleteCommentClickHandler = () => {
    if(!receptionNumber || loginUserId !== qnaWriterId || qnaStatus || !cookies.accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if(!isConfirm) return;
  
    deleteQnaCommentRequest(receptionNumber, cookies.accessToken).then(deleteQnaCommentResponse)
  };
  //                    effect                     //
  useEffect(() => {
    if(!receptionNumber) return;
    getQnaRequest(receptionNumber, cookies.accessToken).then(getQnaResponse);
  }, [])

  //                    render : QnA 화면 컴포넌트                     //
  return (
    <div id='qna-detail-wrapper'>
        <div className='qna-detail-main-box'>
            <div className='qna-detail-top-box'>
              <div style={{width: '250px'}}></div>
              <div className='qna-detail-info-box'>
                <div className='qna-detail-info'>작성자 {qnaWriterId}</div>
                <div className='qna-detail-info-devider'>{'\|'}</div>
                <div className='qna-detail-info'>작성일 {qnaDatetime}</div>
              </div>
            </div>
            <div className='qna-detail-title-box'>{qnaTitle}</div>
            <div className='qna-detail-contents-box'>{qnaContent}</div>
        </div>
        {/* {loginUserRole === 'ROLE_ADMIN' && !status && */}
        <div className='qna-detail-button-box'>
            <div className='qna-show-list' onClick={onListClickHandler}>목록보기</div>
            {/* {loginUserId === writerId && loginUserRole === 'ROLE_USER' && */}
            <div className='qna-detail-owner-button-box'>
              <div className='primary-button' onClick={onUpdateQnaClickHandler}>수정</div>
              <div className='error-button' onClick={onDeleteQnaClickHandler}>삭제</div>
            </div>
            {/* } */}
        </div>
        
        <div className='qna-detail-comment-box'>
          <div className='primary-bedge'>관리자</div>
          <div className='qna-comment-right-box'>
            <div className='qna-detail-comment'>{qnaComment}</div>
            <div className='qna-detail-owner-button-box'>
              <div className='primary-button' onClick={onUpdateCommentClickHandler}>수정</div>
              <div className='error-button' onClick={onDeleteCommentClickHandler}>삭제</div>
            </div>
          </div>
        </div>
            {/* } */}
        <div className='qna-detail-comment-write-box'>
          <div className='qna-detail-comment-textarea-box'>
            <textarea style={{height: `${28 * qnaCommentRows}px`}} className='qna-detail-comment-textarea' placeholder='댓글을 작성해주세요.' onChange={onCommentChangeHandler}/></div>
            <div className='primary-button' onClick={onCommentSubmitClickHandler}>댓글달기</div>
        </div>
    </div>
  );
}