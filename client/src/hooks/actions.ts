import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { studentActions } from '../store/reducers/students/students.slice';

const actions = {
    ...studentActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};
