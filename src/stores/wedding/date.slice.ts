import { StateCreator } from "zustand";


export interface DateSlice {

    eventDate: number;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (partialDate: string) => void;
    setEventTime: (eventTime: string) => void;
}
export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({

    eventDate: new Date().getTime(),

    eventYYYYMMDD: () => {
        const date = new Date(get().eventDate);
        const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
        const dayString = date.getDate().toString().padStart(2, '0');
        return `${date.getFullYear()}-${monthString}-${dayString}`;
    },

    eventHHMM: () => {
        const date = new Date(get().eventDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    setEventDate: (partialDate) => set(state => {
        const [year, month, day] = partialDate.split('-').map(Number);
        const newDate = new Date(state.eventDate);
        newDate.setFullYear(year, month - 1, day);
        return { eventDate: newDate.getTime() };
    }),

    setEventTime: (eventTime: string) => set(state => {
        const [hours, minutes] = eventTime.split(':').map(Number);
        const newDate = new Date(state.eventDate);
        newDate.setHours(hours, minutes);
        return { eventDate: newDate.getTime() };
    }),
});
