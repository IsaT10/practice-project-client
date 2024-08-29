import { useGetAllSemsterQuery } from '../redux/features/admin/academicManagement.api';
import { TAcademicSemester } from '../types/academicManagement.types';

export default function useSemester() {
  const { data: semesterData, isLoading: sisLoading } = useGetAllSemsterQuery([
    {
      name: 'sort',
      value: 'year',
    },
  ]);

  const semesterOptions = semesterData?.data?.map(
    (item: TAcademicSemester) => ({
      value: item._id,
      label: `${item.name} (${item.year})`,
    })
  );

  return { semesterOptions, sisLoading };
}
