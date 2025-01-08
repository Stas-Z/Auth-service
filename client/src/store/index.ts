import { StoreType } from '@/types/store';
import { createStore, useStore as VuexStore } from 'vuex';
import authModule from './authModule';

const store: StoreType = createStore({
    modules: {
        auth: authModule,
    },
});
export function useStore(): StoreType {
    return VuexStore() as StoreType;
}

export default store;
