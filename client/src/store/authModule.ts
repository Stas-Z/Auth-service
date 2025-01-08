import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { RootState } from '@/types/store';
import type { AuthGetters, IUser } from '@/types/user';
import { AuthMutations, UserSchema } from '@/types/user';
import { GetterTree, Module, MutationTree } from 'vuex';

const state: () => UserSchema = () => ({
    isAuth: false,
});

const mutations: MutationTree<UserSchema> & AuthMutations = {
    setCurentUser(state, user: IUser) {
        state.currentUser = user;
        state.isAuth = true;
        localStorage.setItem(USER_LOCALSTORAGE_KEY, 'true');
    },
    setLogout(state) {
        state.isAuth = false;
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
};

const getters: GetterTree<UserSchema, RootState> & AuthGetters = {
    getCurentUser(state) {
        return state.currentUser;
    },
    getIsAuth(state) {
        return state.isAuth;
    },
};

const authModule: Module<UserSchema, RootState> = {
    namespaced: true,
    state,
    mutations,
    getters,
};

export default authModule;
