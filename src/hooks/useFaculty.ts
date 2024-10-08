import { useGetAllAcademicFacultyQuery } from '../redux/features/admin/academicManagement.api';
import { TAcademicFaculty } from '../types/academicManagement.types';

export default function useFaculty() {
  const { data: facultyData, isLoading: fisLoading } =
    useGetAllAcademicFacultyQuery(undefined);

  const academicFacultyOptions = facultyData?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    })
  );

  return { academicFacultyOptions, facultyData, fisLoading };
}

// import { useMemo } from 'react';
// import { useGetAllAcademicFacultyQuery } from '../redux/features/admin/academicManagement.api';
// import { TAcademicFaculty } from '../types/academicManagement.types';

// // Define a type for the faculty option
// type FacultyOption = {
//   value: string;
//   label: string;
// };

// const useFacultyOptions = (): FacultyOption[] => {
//   const { data } = useGetAllAcademicFacultyQuery(undefined);

//   const facultyOptions = useMemo(() => {
//     return (
//       data?.data?.map((item: TAcademicFaculty) => ({
//         value: item._id,
//         label: item.name,
//       })) || []
//     );
//   }, [data]);

//   return facultyOptions;
// };

// export default useFacultyOptions;
