import { TDataResponseRedux, TQueryParam } from '../../../types';
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from '../../../types/academicManagement.types';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemster: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query?.forEach((el: TQueryParam) => {
            params.append(el.name, el.value as string);
          });
        }
        return { url: '/academic-semesters', method: 'GET', params: params };
      },
      transformResponse: (
        response: TDataResponseRedux<TAcademicSemester[]>
      ) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data,
      }),
    }),

    // academic faculty
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: data,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: () => ({
        url: '/academic-faculties',
        method: 'GET',
      }),
      transformResponse: (response: TDataResponseRedux<TAcademicFaculty[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    // academic department
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: '/academic-departments',
        method: 'GET',
      }),
      transformResponse: (
        response: TDataResponseRedux<TAcademicDepartment[]>
      ) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const {
  useGetAllSemsterQuery,
  useCreateAcademicSemesterMutation,
  useCreateAcademicFacultyMutation,
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} = academicManagementApi;
