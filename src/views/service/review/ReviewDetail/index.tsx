import './style.css'

export default function ReviewDetail () {
    return(
        <div id='reivew-detail-wrapper'>

            <div className='review-detail-top-info'>
                <div className='review-detail-text'>작성자</div>
                <div className='review-detail-text'>코리아</div>
                <div className='span'>|</div>
                <div className='review-detail-text'>작성일</div>
                <div className='review-detail-text'>24.05.12</div>
                <div className='span'>|</div>
                <div className='review-detail-text'>조회수</div>
                <div className='review-detail-text'>1</div>
                <div className='span'>|</div>
                <div className='review-detail-text'>추천수</div>
                <div className='review-detail-text'>5</div>
            </div>

            <div className='review-detail-content-wrapper'>
                <div className='review-detail-title'>제목</div>
                <div className='review-detail-content'>내용</div>
            </div>

            <div className='review-detail-bottom'>
                <div className='review-detail-text'>목록보기</div>
                {<div>
                    <div>수정</div>    
                    <div>삭제</div>    
                </div>}
            </div>

            <div className='review-detail-comments-wrapper'>
                <div className='review-detail-text'>닉네임</div>
                <div>
                    <div className='review-detail-text'>댓글</div>
                    <div className='review-detail-text'>답글달기</div>
                    {<div className='review-detail-text'>삭제</div>}
                </div>
            </div>
        </div>
    );
}