import { CreateGroups, CreateStudentDto, Group, Student, UpdateGroup, User } from 'shared/models';
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

        //family
        getAllFamily: builder.query<User[], void>({
            query: () => ({
                url: '/user/family',
                method: 'GET'
            })
        }),

        //groups and students
        createGroup: builder.mutation<void, CreateGroups>({
            query: (data) => ({
                url: '/group',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Group']
        }),
        getAllGroups: builder.query<Group[], void>({
            query: () => ({
                url: '/group',
                method: 'GET'
            }),
            providesTags: ['Group']
        }),

        deleteGroup: builder.mutation<Group, number>({
            query: (id) => ({
                url: `/group/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Group']
        }),
        updateGroup: builder.mutation<void, UpdateGroup>({
            query: (data) => ({
                url: '/group',
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Group']
        }),
        getCountRecordsGroups: builder.query<number, void>({
            query: () => ({
                url: '/group/count',
                method: 'GET'
            }),
            providesTags: ['Group']
        }),
        getRecordsGroups: builder.query<Group[], { skipCount: number; takeCount: number }>({
            query: ({ skipCount, takeCount }) => ({
                url: '/group/records',
                method: 'GET',
                params: { skipCount, takeCount }
            }),
            providesTags: ['Group']
        })
    })
});

export const { useCreateStudentMutation, useGetAllStudentsQuery, useGetAllFamilyQuery, useCreateGroupMutation, useGetAllGroupsQuery, useDeleteGroupMutation, useUpdateGroupMutation, useGetCountRecordsGroupsQuery, useGetRecordsGroupsQuery } = studentApiExtensions;
