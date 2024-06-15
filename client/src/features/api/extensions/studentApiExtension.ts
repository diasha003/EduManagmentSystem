import { CreateStudentDto, Student, User } from 'shared/models';
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
        }),
        getAllFamily: builder.query<User[], void>({
            query: () => ({
                url: '/user/family',
                method: 'GET'
            }),
            async onQueryStarted(arg, api) {
                try {
                    //console.log(arg)
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useCreateStudentMutation, useGetAllStudentsQuery, useGetAllFamilyQuery } = studentApiExtensions;
