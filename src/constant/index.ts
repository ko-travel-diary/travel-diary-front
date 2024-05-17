//                    description : Route Navigation URL PATH                    //
export const MAIN_PATH = '/';

export const AUTH_PATH = '/auth';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';

//                    description : Navigation 절대 URL PATH                    //
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;