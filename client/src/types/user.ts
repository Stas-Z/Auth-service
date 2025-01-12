import { Store } from 'vuex';

export interface IUser {
    id?: string;
    email: string;
    password: string;
    captchaInput?: string;
}

export interface UserSchema {
    currentUser?: IUser | null;
    isAuth?: boolean;
}

export interface AuthMutations {
    setCurentUser(state: UserSchema, payload: IUser): void;
    setLogout(state: UserSchema): void;
}

export interface AuthGetters {
    getCurentUser(state: UserSchema): UserSchema['currentUser'];
    getIsAuth(state: UserSchema): UserSchema['isAuth'];
}

export type UserModule = Store<{ auth?: UserSchema }>;

// type MyAuthActionContext = ActionContext<UserSchema, RootState>;

// export interface AuthActions {}

// export type UserSchema = Omit<
//     Store<{ auth: UserSchema }>,
//     'getters' | 'commit' | 'dispatch'
// > & {
//     commit<
//         K extends keyof AuthMutations,
//         P extends Parameters<AuthMutations[K]>[1],
//     >(
//         key: K,
//         payload?: P,
//         options?: CommitOptions,
//     ): ReturnType<AuthMutations[K]>;
// } & {
//     dispatch<K extends keyof AuthActions>(
//         key: K,
//         payload?: Parameters<AuthActions[K]>[1],
//         options?: DispatchOptions,
//     ): ReturnType<AuthActions[K]>;
// } & {
//     getters: {
//         [K in keyof AuthGetters]: ReturnType<AuthGetters[K]>;
//     };
// };
