export const MAIN_PATH = "/";

export const SNS_PATH = "/sns/:accessToken/:expires";
export const AUTH_PATH = "/authentication";
export const SIGN_IN_PATH = "sign-in";
export const SIGN_UP_PATH = "sign-up";

export const SERVICE_PATH = "/service";
export const QNA_PATH = "qna";
export const REVIEW_PATH = "review";
export const TOUR_PATH = "search";
export const MYPAGE_PATH = "mypage";
export const ADMINPAGE_PATH = "adminpage";

export const SCHEDULE_PATH = "schedule";

export const QNA_WRITE_PATH = "qnawrite";
export const QNA_DETAIL_PATH = ":receptionNumber";
export const QNA_UPDATE_PATH = "update/:receptionNumber";

export const REVIEW_WRITE_PATH = "reviewwrite";
export const REVIEW_DETAIL_PATH = ":reviewNumber";
export const REVIEW_UPDATE_PATH = "update/:reviewNumber";

export const SCHEDULE_WRITE_PATH = "write";
export const SCHEDULE_DETAIL_PATH = ":travelScheduleNumber";
export const SCHEDULE_UPDATE_PATH = "update/:travelScheduleNumber";

export const TOUR_DETAIL_PATH = "tourlist/:tourAttractionsNumber";
export const REST_DETAIL_PATH = "restlist/:restaurantNumber";

// USER
export const PROFILE_UPDATE_PATH = "profile-update";
export const MY_REVIEWLIST_PATH = "review-list";
export const DELETE_USER_PATH = "cancle-account";

// ADMIN
export const TOUR_LIST_PATH = "tour-list";
export const TOUR_ADD_PATH = "add-tour";
export const TOUR_CONTROL_PATH = "tourcontrol/:tourAttractionsNumber";

export const REST_LIST_PATH = "rest-list";
export const REST_ADD_PATH = "add-rest";
export const REST_CONTROL_PATH = "restcontrol/:restaurantNumber";

export const USER_LIST_PATH = "user-list";

// description : Navigation 절대 URL PATH
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

export const AUTH_ABSOLUTE_PATH = AUTH_PATH;
export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;

export const QNA_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}`;
export const REVIEW_ABSOULUTE_PATH = `${SERVICE_PATH}/${REVIEW_PATH}`;
export const MYPAGE_ABSOULUTE_PATH = `${SERVICE_PATH}/${MYPAGE_PATH}`;
export const ADMINPAGE_ABSOULUTE_PATH = `${SERVICE_PATH}/${MYPAGE_PATH}`;
export const TRAVEL_ABSOLUTE_PATH = `${SERVICE_PATH}/${TOUR_PATH}`;
export const TOURATTRACTIONS_ABSOULUTE_PATH = `${SERVICE_PATH}/${TOUR_LIST_PATH}/${TOUR_PATH}`;
export const RESTAURANT_ABSOULUTE_PATH = `${SERVICE_PATH}/${TOUR_LIST_PATH}/${TOUR_PATH}`;

export const QNA_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${QNA_PATH}/${QNA_WRITE_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (receptionNumber: string | number) => `${SERVICE_PATH}/${QNA_PATH}/${receptionNumber}`;
export const QNA_UPDATE_ABSOLUTE_PATH = (receptionNumber: string | number) => `${SERVICE_PATH}/${QNA_PATH}/update/${receptionNumber}`;

export const REVIEW_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${REVIEW_PATH}/${REVIEW_WRITE_PATH}`;
export const REVIEW_DETAIL_ABSOLUTE_PATH = (reviewNumber: string | number) => `${SERVICE_PATH}/${REVIEW_PATH}/${reviewNumber}`;
export const REVIEW_UPDATE_ABSOLUTE_PATH = (reviewNumber: string | number) => `${SERVICE_PATH}/${REVIEW_PATH}/update/${reviewNumber}`;

export const MYPAGE_PROFILEUPDATE_ABSOLUTE_PAGE = `${SERVICE_PATH}/${MYPAGE_PATH}/${PROFILE_UPDATE_PATH}`;
export const SCHEDULE_ABSOLUTE_PATH = `${SERVICE_PATH}/${MYPAGE_PATH}/${SCHEDULE_PATH}`;
export const MY_REVIEWLIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${MYPAGE_PATH}/${MY_REVIEWLIST_PATH}`;
export const DELETE_USER_ABSOLUTE_PAGE = `${SERVICE_PATH}/${MYPAGE_PATH}/${DELETE_USER_PATH}`;

export const SCHEDULE_WRITE_ABSOLUTE_PATH = `${SERVICE_PATH}/${MYPAGE_PATH}/${SCHEDULE_PATH}/${SCHEDULE_WRITE_PATH}`;
export const SCHEDULE_DETAIL_ABSOLUTE_PATH = (travelScheduleNumber: string | number) =>
    `${SERVICE_PATH}/${MYPAGE_PATH}/${SCHEDULE_PATH}/${travelScheduleNumber}`;
export const SCHEDULE_UPDATE_ABSOLUTE_PATH = (travelScheduleNumber: string | number) =>
    `${SERVICE_PATH}/${MYPAGE_PATH}/${SCHEDULE_PATH}/update/${travelScheduleNumber}`;

export const ADMINPAGE_ABSOULUTE_PAGE = `${SERVICE_PATH}/${ADMINPAGE_PATH}`;
export const ADMINPAGE_USER_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${ADMINPAGE_PATH}/${USER_LIST_PATH}`;
export const ADMINPAGE_TOUR_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${ADMINPAGE_PATH}/${TOUR_LIST_PATH}`;
export const ADMINPAGE_REST_LIST_ABSOLUTE_PATH = `${SERVICE_PATH}/${ADMINPAGE_PATH}/${REST_LIST_PATH}`;
export const ADMINPAGE_TOUR_ADD_ABSOLUTE_PATH = `${SERVICE_PATH}/${ADMINPAGE_PATH}/${TOUR_ADD_PATH}`;
export const ADMINPAGE_REST_ADD_ABSOLUTE_PATH = `${SERVICE_PATH}/${ADMINPAGE_PATH}/${REST_ADD_PATH}`;

export const ADMINPAGE_TOUR_CONTROL_ABSOLUTE_PATH = (tourAttractionsNumber: string | number) =>
    `${SERVICE_PATH}/${ADMINPAGE_PATH}/tourcontrol/${tourAttractionsNumber}`;
export const ADMINPAGE_REST_CONTROL_ABSOLUTE_PATH = (restaurantNumber: string | number) =>
    `${SERVICE_PATH}/${ADMINPAGE_PATH}/restcontrol/${restaurantNumber}`;

export const TOURATTRACTIONS_DETAIL_ABSOLUTE_PATH = (tourAttractionsNumber: string | number) => {
    console.log(`${SERVICE_PATH}/${TOUR_PATH}/tourlist/${tourAttractionsNumber}`);
    return `${SERVICE_PATH}/${TOUR_PATH}/tourlist/${tourAttractionsNumber}`;
};
export const RESTAURANT_DETAIL_ABSOLUTE_PATH = (restaurantNumber: string | number) => `${SERVICE_PATH}/${TOUR_PATH}/restlist/${restaurantNumber}`;

// description : API URL PATH
export const SERVER_DOMAIN_URL = process.env.REACT_APP_REST_API_SEVER_DOMAIN;
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/traveldiary/v1`;

// file
export const SEVER_IMAGE_FILE_MODULE_URL = `${SERVER_API_URL}/image`;
export const IMAGE_UPLOAD_URL = `${SEVER_IMAGE_FILE_MODULE_URL}/upload`;
export const IMAGE_LOAD_URL = (imageUrl: string) => `${SEVER_IMAGE_FILE_MODULE_URL}/file/${imageUrl}`;

// auth
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;
export const SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const NICKNAME_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/nickname-check`;
export const EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;
export const SIGN_OUT_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-out`;

//qna
export const SERVER_QNA_MODULE_URL = `${SERVER_API_URL}/qna`;
export const POST_QNA_REQUEST_URL = `${SERVER_QNA_MODULE_URL}/`;
export const POST_QNA_COMMENT_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/comment`;
export const GET_QNA_LIST_REQUEST_URL = `${SERVER_QNA_MODULE_URL}/list`;
export const GET_SEARCH_QNA_LIST_REQUEST_URL = `${SERVER_QNA_MODULE_URL}/search`;
export const GET_QNA_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}`;
export const PATCH_QNA_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}`;
export const PATCH_QNA_COMMENT_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/comment`;
export const DELETE_QNA_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}`;
export const DELETE_QNA_COMMENT_REQUEST_URL = (receptionNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${receptionNumber}/comment`;

//review
export const SERVER_REVIEW_MODULE_URL = `${SERVER_API_URL}/review`;
export const POST_REVIEW_REQUEST_URL = `${SERVER_REVIEW_MODULE_URL}/`;
export const POST_REVIEW_COMMENT_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/comment`;
export const GET_REVIEW_LIST_REQUEST_URL = `${SERVER_REVIEW_MODULE_URL}/list`;
export const GET_SEARCH_REVIEW_REQUEST_LIST_URL = `${SERVER_REVIEW_MODULE_URL}/search`;
export const GET_REVIEW_MY_LIST_REQUEST_URL = `${SERVER_REVIEW_MODULE_URL}/my-list`;
export const GET_REVIEW_MY_LIST_SEARCH_REQUEST_URL = `${SERVER_REVIEW_MODULE_URL}/my-search`;
export const GET_COMMENT_LIST_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/comment/list`;
export const GET_REVIEW_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}`;
export const GET_REVIEW_FAVORITE_STATUS_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/favorite`;
export const PATCH_REVIEW_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}`;
export const PATCH_REVIEW_COMMENT_REQUEST_URL = (commentNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/comment/${commentNumber}`;
export const PATCH_INCREASE_VIEW_COUNT_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/view-count`;
export const PATCH_FAVORITE_COUNT_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/favorite`;
export const DELETE_REVIEW_REQUEST_URL = (reviewNumber: number | string) => `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}`;
export const DELETE_REVIEW_COMMENT_REQUEST_URL = (reviewNumber: number | string, commentNumber: number | string) =>
    `${SERVER_REVIEW_MODULE_URL}/${reviewNumber}/comment/${commentNumber}`;

// mypage
export const SERVER_MYPAGE_MODULE_URL = `${SERVER_API_URL}/mypage`;
export const SERVER_SCHEDULE_MODULE_URL = `${SERVER_API_URL}/schedule`;
export const POST_SCHEDULE_REQUEST_URL = `${SERVER_SCHEDULE_MODULE_URL}/`;
export const GET_SCHEDULE_LIST_REQUEST_URL = `${SERVER_SCHEDULE_MODULE_URL}/list`;
export const GET_SCHEDULE_REQUEST_URL = (travelScheduleNumber: number | string) => `${SERVER_SCHEDULE_MODULE_URL}/${travelScheduleNumber}`;
export const PATCH_SCHEDULE_REQUEST_URL = (travelScheduleNumber: number | string) => `${SERVER_SCHEDULE_MODULE_URL}/${travelScheduleNumber}`;
export const DELETE_SCHEDULE_REQUEST_URL = (travelScheduleNumber: number | string) => `${SERVER_SCHEDULE_MODULE_URL}/${travelScheduleNumber}`;

// user
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;
export const POST_USER_NICKNAME_REQUEST_URL = `${SERVER_USER_MODULE_URL}/nick-name`;
export const GET_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
export const GET_USER_LIST_REQUEST_URL = `${SERVER_USER_MODULE_URL}/list`;
export const GET_SEARCH_USER_LIST_REQUEST_URL = `${SERVER_USER_MODULE_URL}/search`;
export const GET_USER_INFO_REQUEST_URL = (userId: number | string) => `${SERVER_USER_MODULE_URL}/${userId}`;
export const PATCH_USER_INFO_REQUEST_URL = `${SERVER_USER_MODULE_URL}/edit`;
export const DELETE_USER_REQUEST_URL = `${SERVER_USER_MODULE_URL}/${DELETE_USER_PATH}`;
export const DELETE_ADMIN_USER_REQUEST_URL = `${GET_USER_LIST_REQUEST_URL}/${DELETE_USER_PATH}`;

// tour-attractions
export const SERVER_TOURATTRACTIONS_MODULE_URL = `${SERVER_API_URL}/tour-attractions`;
export const GET_TOURATTRACTIONS_LIST_REQUEST_URL = `${SERVER_TOURATTRACTIONS_MODULE_URL}/list`;
export const GET_TOURATTRACTIONS_REQUEST_URL = (tourAttractionsNumber: number | string) =>
    `${SERVER_TOURATTRACTIONS_MODULE_URL}/${tourAttractionsNumber}`;
export const GET_SEARCH_TOURATTRACTIONS_LIST_REQUEST_URL = `${SERVER_TOURATTRACTIONS_MODULE_URL}/search`;
export const GET_TOURATTRACTIONS_RECOMMEND_URL = (tourAttractionsNumber: number | string) =>
    `${SERVER_TOURATTRACTIONS_MODULE_URL}/${tourAttractionsNumber}`;
export const PATCH_TOURATTRACTIONS_RECOMMEND_URL = (tourAttractionsNumber: number | string) =>
    `${SERVER_TOURATTRACTIONS_MODULE_URL}/${tourAttractionsNumber}/recommend`;
export const POST_TOURATTRACTIONS_REQUEST_URL = `${SERVER_TOURATTRACTIONS_MODULE_URL}/`;
export const PATCH_TOURATTRACTIONS_REQUEST_URL = (tourAttractionsNumber: number | string) =>
    `${SERVER_TOURATTRACTIONS_MODULE_URL}/${tourAttractionsNumber}`;
export const DELETE_TOURATTRACTIONS_REQUEST_URL = (tourAttractionsNumber: number | string) =>
    `${SERVER_TOURATTRACTIONS_MODULE_URL}/${tourAttractionsNumber}`;

// restaurant
export const SERVER_RESTAURANT_MODULE_URL = `${SERVER_API_URL}/restaurant`;
export const GET_RESTAURANT_LIST_REQUEST_URL = `${SERVER_RESTAURANT_MODULE_URL}/list`;
export const GET_RESTAURANT_REQUEST_URL = (restaurantNumber: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantNumber}`;
export const GET_SEARCH_RESTAURANT_LIST_REQUEST_URL = `${SERVER_RESTAURANT_MODULE_URL}/search`;
export const GET_RESTAURANT_RECOMMEND_URL = (restaurantNumber: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantNumber}`;
export const PATCH_RESTAURANT_RECOMMEND_URL = (restaurantNumber: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantNumber}/recommend`;
export const POST_RESTAURANT_REQUEST_URL = `${SERVER_RESTAURANT_MODULE_URL}/`;
export const PATCH_RESTAURANT_REQUEST_URL = (restaurantNumber: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantNumber}`;
export const DELETE_RESTAURANT_REQUEST_URL = (restaurantNumber: number | string) => `${SERVER_RESTAURANT_MODULE_URL}/${restaurantNumber}`;

// address
export const GET_COORDINATE_URL = `${SERVER_API_URL}/address/search`;
export const GET_ADDRESS_URL = `${SERVER_API_URL}/address/query`;

// waypoints
export const POST_WAYPOINTS_URL = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";

// sns login
export const SNS_LOGIN_URL = `${SERVER_API_URL}/auth/oauth2/`;

// description : Board Const
export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;

export const SHOW_IMAGE_BUTTON_LIMIT = 7;
