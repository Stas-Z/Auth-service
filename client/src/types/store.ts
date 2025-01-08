import { Store } from 'vuex';
import { UserSchema } from './user';

export type UserModule = Store<{ auth: UserSchema }>;

export interface StateProps {
    state: {
        auth: UserSchema;
    };
}
export type RootState = StateProps['state'];

export type StoreType = StateProps & UserModule;
