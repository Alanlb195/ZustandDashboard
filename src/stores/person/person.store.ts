import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { sessionStorageApi } from "../storages/session-storage.storage";
import { firebaseStorageApi } from "../storages/firebase.storage";
import { useWeddingBoundStore } from "../wedding";
// import { logger } from "../middlewares/logger.middleware";


interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (valud: string) => void;
    setLastName: (valud: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',

    setFirstName: (value: string) => set(state => ({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(state => ({ lastName: value }), false, 'setFirstName'),
});

export const usePersonStore = create<PersonState & Actions>()(
    // logger(
        devtools(
            persist(
                storeApi,
                {
                    name: 'person-storage',
                    // storage: sessionStorageApi
                    storage: firebaseStorageApi
                }
            ),
        )
    // )
)

usePersonStore.subscribe((nextState, prevState) => {


    const { firstName, lastName } = nextState;

    useWeddingBoundStore.getState().setFirstName(firstName);
    useWeddingBoundStore.getState().setLastName(lastName);

});