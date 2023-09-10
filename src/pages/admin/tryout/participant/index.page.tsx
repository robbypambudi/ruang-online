import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FiArrowLeft, FiAward, FiEye, FiPlus } from 'react-icons/fi';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import PaginatedTable from '@/components/table/PaginatedTable';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { TryoutParticipant } from '@/types/entities/tryout-participant';

type GenerateGrade = {
  quiz_list_id: string;
};

export default withAuth(TryoutParticipantIndexPage, [
  'admin_tryout_participant.index',
]);
function TryoutParticipantIndexPage() {
  const router = useRouter();

  const { quiz_list_id } = router.query;

  const { data: unpaginatedData, refetch } = useQuery<
    ApiResponse<TryoutParticipant[]>,
    Error
  >([`/admin/quiz_list/user?quiz_list_id=${quiz_list_id}`], {
    enabled: quiz_list_id !== undefined,
    keepPreviousData: true,
  });

  const tableRef = React.useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Nilai Tryout Geosentric 2023',
    sheet: 'Nilai Tryout Geosentric 2023',
  });

  const columns: ColumnDef<TryoutParticipant>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'team_name',
      header: 'Team Name',
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
        <Typography>{row.original.question_attemp ?? '-'}</Typography>
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
          href={`/admin/tryout/participant/pembahasan?quiz_list_id=${row.original.quiz_list_id}&user_id=${row.original.user_id}&username=${row.original.username}`}
        />
      ),
    },
  ];

  const { mutate: generateGrade } = useMutationToast<void, GenerateGrade>(
    useMutation((data) => {
      return api.post('/admin/quiz_list/grade/generate', data);
    })
  );

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
        <div className='space-x-2'>
          <ButtonLink
            href={`/admin/tryout/participant/assign?quiz_list_id=${quiz_list_id}`}
            leftIcon={FiPlus}
          >
            Masukkan Peserta
          </ButtonLink>
          <Button
            onClick={() =>
              generateGrade(
                { quiz_list_id: quiz_list_id as string },
                {
                  onSuccess: () => {
                    refetch();
                  },
                }
              )
            }
            leftIcon={FiAward}
            variant='danger'
          >
            Hitung Nilai
          </Button>
          <Button onClick={onDownload} variant='outline'>
            Export to Excel
          </Button>
        </div>
      </header>

      <main>
        <section>
          <PaginatedTable
            data={unpaginatedData?.data ?? []}
            columns={columns}
            withFilter
            tableRef={tableRef}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
