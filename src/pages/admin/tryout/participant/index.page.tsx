import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiArrowLeft, FiEye, FiPlus } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import PaginatedTable from '@/components/table/PaginatedTable';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { TryoutParticipant } from '@/types/entities/tryout-participant';

export default withAuth(TryoutParticipantIndexPage, [
  'admin_tryout_participant.index',
]);
function TryoutParticipantIndexPage() {
  const router = useRouter();

  const { quiz_list_id } = router.query;

  const { data: unpaginatedData } = useQuery<
    ApiResponse<TryoutParticipant[]>,
    Error
  >([`/admin/quiz_list/user?quiz_list_id=${quiz_list_id}`], {
    enabled: quiz_list_id !== undefined,
    keepPreviousData: true,
  });

  const columns: ColumnDef<TryoutParticipant>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
      // To set size, add size in pixel
      size: 10,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'grade',
      header: 'Grade',
      cell: ({ row }) => <Typography>{row.original.grade ?? '-'}</Typography>,
    },
    {
      accessorKey: 'correct_answer',
      header: 'Correct Answer',
      cell: ({ row }) => (
        <Typography>{row.original.correct_answer ?? '-'}</Typography>
      ),
    },
    {
      header: 'Incorrect Answer',
      accessorKey: 'incorrect_answer',
      cell: ({ row }) => (
        <Typography>{row.original.incorrect_answer ?? '-'}</Typography>
      ),
    },
    {
      header: 'Time Spend',
      accessorKey: 'total_spend',
      cell: ({ row }) => (
        <Typography>{row.original.total_spend ?? '-'}</Typography>
      ),
    },
    {
      header: 'Question Attempt',
      accessorKey: 'question_attemp',
      cell: ({ row }) => (
        <Typography>{row.original.question_attempt ?? '-'}</Typography>
      ),
    },
    {
      header: 'End Date Quiz',
      accessorKey: 'end_date',
      cell: ({ row }) => (
        <Typography>
          {new Date(row.original.end_date).toLocaleString() ?? '-'}
        </Typography>
      ),
    },
    {
      header: 'Quiz Status',
      cell: ({ row }) => <Typography>{row.original.status}</Typography>,
    },

    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <IconLink
          variant='outline'
          icon={FiEye}
          href={'/admin/geolympic/' + row.original.grade_id}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Seo templateTitle='Peserta Tryout' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/${quiz_list_id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={['/admin', '/admin/tryout', '/admin/tryout/participant']}
            />
            <Typography variant='h2' className='font-bold'>
              Peserta Tryout
            </Typography>
          </div>
        </div>
        <div>
          <ButtonLink
            href={`/admin/tryout/participant/assign?quiz_list_id=${quiz_list_id}`}
            leftIcon={FiPlus}
          >
            Masukkan Peserta
          </ButtonLink>
        </div>
      </header>

      <main>
        <section>
          <PaginatedTable
            data={unpaginatedData?.data ?? []}
            columns={columns}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
