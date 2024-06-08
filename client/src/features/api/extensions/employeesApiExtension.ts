
import { Employee, CreateEmployeeDto } from 'shared/models';
import { baseApi } from '../api';

export const employeesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation<void, CreateEmployeeDto>({
            query: (userData) => ({
                url: '/employee',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, api) {
                try {
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getAllCenterName: builder.query<string[], void>({
            query: () => ({
                url: '/employee/allCenterName',
                method: 'GET'
            }),
            async onQueryStarted(arg, api) {
                try {
                    //console.log(api.queryFulfilled)
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        getAllEmployees: builder.query<Employee[] | undefined, void>({
            query: () => ({
                url: '/employee',
                method: 'GET'
            }),
            async onQueryStarted(arg, api) {
                try {
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Employees']
        }),
        deleteEmployee: builder.mutation<void, number>({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
               
            })
            //invalidatesTags: (result, error, arg) => [],
        })
    })
});

export const { useGetAllEmployeesQuery, useCreateMutation, useGetAllCenterNameQuery, useDeleteEmployeeMutation } = employeesApi;
export const {
    endpoints: { getAllEmployees, create }
} = employeesApi;
