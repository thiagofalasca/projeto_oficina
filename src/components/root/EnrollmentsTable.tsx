import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { RemoveStudentButton } from './EnrollmentButtons';
import { Badge } from '../ui/badge';
import { enrollmentStatusStyles, Role } from '@/lib/constants';
import { fetchEnrollments } from '@/lib/actions/enrollment/fetchEnrollmentAction';

const EnrollmentsTable = async ({
  workshopId,
  page,
  userRole,
}: {
  workshopId: string;
  page: number;
  userRole: Role;
}) => {
  const enrollments = await fetchEnrollments(workshopId, page);

  if (enrollments.length === 0) {
    return (
      <div className="flex-center h-32 rounded-md border border-dashed text-gray-500">
        Nenhum participante inscrito
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          {userRole !== 'user' && (
            <TableHead className="sr-only">Ações</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {enrollments.map((enrollment) => (
          <TableRow key={enrollment.id}>
            <TableCell>{enrollment.name}</TableCell>
            <TableCell>{enrollment.email}</TableCell>
            <TableCell>
              <Badge
                variant={'outline'}
                className={
                  enrollmentStatusStyles[
                    enrollment.status as keyof typeof enrollmentStatusStyles
                  ]
                }
              >
                {enrollment.status}
              </Badge>
            </TableCell>
            {userRole !== 'user' && (
              <TableCell className="text-right">
                <RemoveStudentButton
                  studentId={enrollment.id}
                  workshopId={workshopId}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EnrollmentsTable;
