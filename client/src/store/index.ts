import { RootState, StoreType } from '@/types/store';
import { createStore, useStore as VuexStore } from 'vuex';
import authModule from './authModule';

const store: StoreType = createStore({
    state: (): RootState => ({
        isLoading: false,
        auth: {},
    }),
    mutations: {
        setLoading(state, payload: boolean) {
            state.isLoading = payload;
        },
    },
    getters: {
        isLoading: (state) => state.isLoading,
    },
    modules: {
        auth: authModule,
    },
});
export function useStore(): StoreType {
    return VuexStore() as StoreType;
}

export default store;
