import { CreateStudentDto, Student } from 'shared/models';
import { baseApi } from '../api';

export const studentApiExtensions = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation<void, CreateStudentDto>({
            query: (data) => ({
                url: '/student',
                method: 'POST',
                body: data
            })
        }),
        getAllStudents: builder.query<Student[] | undefined, void>({
            query: () => ({
                url: '/student',
                method: 'GET'
            }),
            async onQueryStarted(arg, api) {
                try {
                    //console.log(arg)
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Students']
        })
    })
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } = studentApiExtensions;
