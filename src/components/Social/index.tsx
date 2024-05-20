import './style.css';

//                    Component : 소셜 컴포넌트                     //
function Social () {

    //                    render : 소셜 컴포넌트                     //
    return (
        <div className='sns-button-box'>
            <div className='sns-button naver'></div>
            <div className='sns-button kakao'></div>
            <div className='sns-button google'></div>
        </div>
    );
}

export default Social;