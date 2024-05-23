import { create } from "zustand";

interface UserStore {
    loginUserId: string,
    setLoginUserId: (loginUserId: string) => void, 
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
}

const useUserStore = create<UserStore>(set => ({
    loginUserId: 'admin',
    setLoginUserId: (loginUserId: string) => set(state => ({...state, loginUserId})),
    loginUserRole: 'ROLE_ADMIN',
    setLoginUserRole: (loginUserRole: string) => set(state => ({...state, loginUserRole}))
}));

export default useUserStore;