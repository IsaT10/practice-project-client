import { useGetAllAcademicDepartmentQuery } from '../redux/features/admin/academicManagement.api';
import { TAcademicDepartment } from '../types/academicManagement.types';

export default function useDepartment() {
  const { data: departmentData, isLoading: disLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const departmentOptions = departmentData?.data?.map(
    (item: TAcademicDepartment) => ({ value: item._id, label: item.name })
  );

  return { departmentOptions, departmentData, disLoading };
}
