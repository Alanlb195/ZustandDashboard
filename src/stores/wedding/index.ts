import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

import {
    devtools,
    // persist
} from "zustand/middleware";

// create store:
type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
    // persist(
        devtools(
            (...a) => ({
                ...createPersonSlice(...a),
                ...createGuestSlice(...a),
                ...createDateSlice(...a),
                ...createConfirmationSlice(...a)
            })
        // ), { name: 'weeding-store' }
    )
)