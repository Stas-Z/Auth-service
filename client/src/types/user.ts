import { ActionContext, CommitOptions, DispatchOptions, Store } from 'vuex';
import { RootState } from './store';

export interface IUser {
    id?: string;
    email: string;
    password: string;
    isActive?: boolean;
    captchaInput?: string;
}

export interface UserSchema {
    currentUser?: IUser;
    isAuth: boolean;
}

export interface AuthMutations {
    setCurentUser(state: UserSchema, payload: IUser): void;
    setLogout(state: UserSchema): void;
}

export interface AuthGetters {
    getCurentUser(state: UserSchema): UserSchema['currentUser'];
    getIsAuth(state: UserSchema): UserSchema['isAuth'];
}

type MyAuthActionContext = ActionContext<UserSchema, RootState>;

export interface AuthActions {
    sendSubmit({ commit }: MyAuthActionContext): Promise<void>;
}

export type PostModule = Omit<
    Store<{ auth: UserSchema }>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<
        K extends keyof AuthMutations,
        P extends Parameters<AuthMutations[K]>[1],
    >(
        key: K,
        payload?: P,
        options?: CommitOptions,
    ): ReturnType<AuthMutations[K]>;
} & {
    dispatch<K extends keyof AuthActions>(
        key: K,
        payload?: Parameters<AuthActions[K]>[1],
        options?: DispatchOptions,
    ): ReturnType<AuthActions[K]>;
} & {
    getters: {
        [K in keyof AuthGetters]: ReturnType<AuthGetters[K]>;
    };
};
