import { STAFFS, DEPARTMENTS } from "../Shared/staffs";

export const initialState = {
    staffs: JSON.parse(localStorage.getItem('staffs')) || STAFFS,
    departments: DEPARTMENTS,
}

export const Reducer = (state = initialState, action) => {
    return state;
};