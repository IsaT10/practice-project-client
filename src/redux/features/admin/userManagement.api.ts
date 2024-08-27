import { TDataResponseRedux, TQueryParam } from '../../../types';
import { TStudent } from '../../../types/userManagement.types';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query?.forEach((el: TQueryParam) => {
            params.append(el.name, el.value as string);
          });
        }
        return { url: '/students', method: 'GET', params: params };
      },
      transformResponse: (response: TDataResponseRedux<TStudent[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getSingleStudent: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: 'GET',
      }),
    }),

    updateStudent: builder.mutation({
      query: (options) => ({
        url: `/students/${options.id}`,
        method: 'PATCH',
        body: options.data,
      }),
    }),

    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: '/users/create-student',
          method: 'POST',
          body: data,
        };
      },
    }),

    // faculty
    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: '/users/create-faculty',
          method: 'POST',
          body: data,
        };
      },
    }),

    // admin
    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: '/users/create-admin',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useAddFacultyMutation,
  useAddAdminMutation,
} = userManagementApi;
