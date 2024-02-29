import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IStudent } from '../../../models/IStudent'

export const studentApi = createApi({
    reducerPath: 'student/Api',
    baseQuery: fetchBaseQuery({
        //baseUrl: '/'
    }),
    endpoints: build => ({
       getStudents: build.query<IStudent[], null>({
        query: () => ({
            url: ""
        })
       }) 
    })
})


export const {} = studentApi