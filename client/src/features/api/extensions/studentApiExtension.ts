import { CreateStudentDto } from 'shared/models';
import { baseApi } from '../api';

export const studentApiExtensions = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation<void, CreateStudentDto>({
            query: (data) => ({
                url: '/student',
                method: 'POST',
                body: data
            })
        })
    })
});

export const {useCreateStudentMutation} = studentApiExtensions;
