import { ChangeEvent, useRef, useState } from 'react';
import './style.css'
import { useCookies } from 'react-cookie';
import { PostTravelReviewRequestDto } from 'src/apis/review/dto/request';
import { postTravelReviewRequest } from 'src/apis/review';
import ResponseDto from 'src/apis/response.dto';
import { IMAGE_UPLOAD_URL, REVIEW_ABSOULUTE_PATH, REVIEW_DETAIL_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';
import { PostTravelReviewResponseDto } from 'src/apis/review/dto/response';
import axios from 'axios';

export default function ReviewWrite () {

    //                    state                     //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const [cookies] = useCookies();

    const [reviewContent, setReivewContent] = useState<string> ('');
    const [reviewTitle, setReviewTitle] = useState<string> ('');
    const [travelReviewImage, setTravelReviewImage] = useState<File[]>([]);
    const [travelReviewImageUrl, setTravelReviewImageUrl] = useState<string[]>([]);
    const photoInput = useRef<HTMLInputElement | null>(null);

    //                    function                     //
    const navigator = useNavigate();

    const postTravelReviewResponse = (result: PostTravelReviewResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : "";

        if(!result || result.code !== 'SU') {
            alert(message);
            navigator(REVIEW_ABSOULUTE_PATH);
            return;
        }

        const { reviewNumber } = result as PostTravelReviewResponseDto;

        navigator(REVIEW_DETAIL_ABSOLUTE_PATH(reviewNumber));
    };

    //                     event handler                     //
    const onReviewContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const reviewContent = event.target.value;
        setReivewContent(reviewContent);
    
        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onReviewTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const reviewTitle = event.target.value;
        setReviewTitle(reviewTitle);
    };

    const imageInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];
        setTravelReviewImage([...travelReviewImage, file]);
        const url = URL.createObjectURL(file);
        setTravelReviewImageUrl([...travelReviewImageUrl, url]);
    };

    const onPostReviewButtonClickHandler = async () => {
        if(!reviewTitle.trim() || !reviewContent.trim()) return;
        if(!cookies.accessToken) return;

        const travelReviewImageUrl: string[] = [];

        // travelReviewImage upload 반복작업
        for (const image of travelReviewImage) {
            const data = new FormData();
            data.append('file', image);
            const url = await axios.post(IMAGE_UPLOAD_URL, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${cookies.accessToken}` } }).then(response => response.data as string).catch(error => null);
            if (!url) continue;
            console.log(url);
            travelReviewImageUrl.push(url);
        }

        const requestBody: PostTravelReviewRequestDto = {reviewTitle, reviewContent, travelReviewImageUrl }; 
        postTravelReviewRequest(requestBody, cookies.accessToken).then(postTravelReviewResponse);
    };

    const onImageUploadButtonClickHandler = () => {
        if (!photoInput.current) return;
        photoInput.current.click();
    };

    //                    render : review 작성 화면 컴포넌트                     //
    return(
        <div id='review-write-wrapper'>
            <div className='null-box'></div>
            <div className='write-button-wrapper'>
                <input
                type="file"
                accept="image/jpg, image/png"
                multiple
                ref={photoInput}
                onChange={imageInputOnChange}
                style={{ display: 'none' }}
                />
                <div className='update-image-button primary-button' onClick={onImageUploadButtonClickHandler}>사진 추가</div>
                <div className='update-my-travel-diary-butoon primary-button'>나의 여행일정 불러오기</div>
            </div>
            <div className='write-contents-box'>
                <div className='write-title-box'>
                    <textarea  placeholder='제목을 입력해주세요' className='write-title-textarea' onChange={onReviewTitleChangeHandler} value={reviewTitle}/>
                </div>
                <div className='write-content-box'>
                    <textarea ref={contentsRef} rows={10} placeholder='내용을 입력해주세요' maxLength={1000} className='write-content-textarea' onChange={onReviewContentChangeHandler} value={reviewContent}/>
                </div>
            </div>
            <div>
                {travelReviewImageUrl.map(url => <img src={url} />)}
            </div>
            <div className='write-update-button'>
                <div className='primary-button' onClick={onPostReviewButtonClickHandler}>올리기</div>
            </div>
        </div>
    );
}