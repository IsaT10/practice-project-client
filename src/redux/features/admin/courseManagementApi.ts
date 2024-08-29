import { TDataResponseRedux, TQueryParam } from '../../../types';
import {
  TCourse,
  TRegisteredSemester,
} from '../../../types/courseManagement.types';
import { baseApi } from '../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query?.forEach((el: TQueryParam) => {
            params.append(el.name, el.value as string);
          });
        }
        return {
          url: '/semester-registrations',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['semesterRegistration'],
      transformResponse: (
        response: TDataResponseRedux<TRegisteredSemester[]>
      ) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    addSemesterRegistration: builder.mutation({
      query: (data) => {
        return {
          url: '/semester-registrations/create-semester-registration',
          method: 'POST',
          body: data,
        };
      },
    }),

    updateSemesterStatus: builder.mutation({
      query: (options) => {
        return {
          url: `/semester-registrations/${options.id}`,
          method: 'PATCH',
          body: options.data,
        };
      },
      invalidatesTags: ['semesterRegistration'],
    }),

    // courses

    getAllCourses: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query?.forEach((el: TQueryParam) => {
            params.append(el.name, el.value as string);
          });
        }
        return {
          url: '/courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['course'],
      transformResponse: (response: TDataResponseRedux<TCourse[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    addCourses: builder.mutation({
      query: (data) => {
        return {
          url: '/courses/create-course',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['course'],
    }),

    addFacultyToCourse: builder.mutation({
      query: (options) => {
        return {
          url: `/courses/${options.courseId}/assign-faculties`,
          method: 'PUT',
          body: options.data,
        };
      },
      invalidatesTags: ['course'],
    }),
    getCourseWithFaculty: builder.mutation({
      query: (courseId) => {
        return {
          url: `/courses/${courseId}/get-faculties`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterStatusMutation,
  useGetAllCoursesQuery,
  useAddCoursesMutation,
  useAddFacultyToCourseMutation,
  useGetCourseWithFacultyMutation,
} = courseManagementApi;
