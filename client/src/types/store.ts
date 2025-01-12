import { UserModule, UserSchema } from './user';

export interface StateProps {
    state: {
        auth?: UserSchema;
        isLoading: boolean;
    };
}
export type RootState = StateProps['state'];

export type StoreType = StateProps & UserModule;
