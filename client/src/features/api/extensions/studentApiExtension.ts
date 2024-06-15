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
        }),

        //groups and students
        createGroup: builder.mutation<void, CreateGroups>({
            query: (data) => ({
                url: '/student/group',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Group']
        }),
        getAllGroups: builder.query<Group[], void>({
            query: () => ({
                url: '/student/groups',
                method: 'GET'
            }),
            async onQueryStarted(arg, api) {
                try {
                    //console.log(arg)
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Group']
        }),
        deleteGroup: builder.mutation<Group, number>({
            query: (id) => ({
                url: `/student/group/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Group']
        }),
        updateGroup: builder.mutation<void, UpdateGroup>({
            query: (data) => ({
                url: '/student//updateGroup',
                method: 'PATCH',
                body: data
            }),

            invalidatesTags: ['Group']
        })
    })
});

export const { useCreateStudentMutation, useGetAllStudentsQuery, useGetAllFamilyQuery, useCreateGroupMutation, useGetAllGroupsQuery, useDeleteGroupMutation, useUpdateGroupMutation } = studentApiExtensions;
