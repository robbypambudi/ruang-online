import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaEye } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

import api from '@/lib/axios';
import { buildPaginatedTableURL } from '@/lib/table';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useServerTable from '@/hooks/useServerTable';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import { PaginatedApiResponse } from '@/types/api';
import { GeolympicList } from '@/types/entities/geolympic';
import { PAYMENT_STATUS } from '@/types/entities/payment';

type TryoutParticipantData = {
  quiz_list_id: string;
  user: {
    user_id: string;
  }[];
};

export default withAuth(TryoutParticipantIndexPage, [
  'admin_tryout_participant.index',
]);

function TryoutParticipantIndexPage() {
  const router = useRouter();
  const { tableState, setTableState } = useServerTable<GeolympicList>();

  const { quiz_list_id } = router.query;

  const { mutate } = useMutationToast<void, TryoutParticipantData>(
    useMutation((data) => {
      return api.post('/admin/quiz_list/assign', data);
    })
  );

  const handleAssign = ({ user_id }: { user_id: string }) => {
    const data: TryoutParticipantData = {
      quiz_list_id: quiz_list_id as string,
      user: [
        {
          user_id: user_id,
        },
      ],
    };
    mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const columns: ColumnDef<GeolympicList & { status_quiz: string }>[] = [
    {
      header: 'No',
      cell: ({ row }) =>
        tableState.pagination.pageSize * tableState.pagination.pageIndex +
        row.index +
        1,
      size: 5,
    },
    {
      accessorKey: 'team_name',
      header: 'Team Name',
      size: 60,
    },
    {
      accessorKey: 'asal_sekolah',
      header: 'Asal Sekolah',
      size: 20,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 5,
      cell: ({ row }) => (
        <Tag
          color={row.original.status === 'unverified' ? 'danger' : 'success'}
        >
          {PAYMENT_STATUS[row.original.status]}
        </Tag>
      ),
    },
    {
      id: 'Status Quiz',
      header: 'Status Quiz',
      cell: ({ row }) => (
        <Tag
          color={
            row.original.status_quiz === 'Belum Terdaftar'
              ? 'warning'
              : 'success'
          }
        >
          {row.original.status_quiz === ''
            ? 'Belum Terdaftar'
            : row.original.status_quiz}
        </Tag>
      ),
      size: 10,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center space-x-4'>
          <IconLink
            href={`/admin/geolympic/${row.original.team_id}`}
            icon={FaEye}
            iconClassName='text-gray-500'
          />
          <Button
            variant='outline'
            disabled={row.original.status_quiz !== 'Belum Terdaftar'}
            onClick={() => handleAssign({ user_id: row.original.user_id })}
          >
            Tambah
          </Button>
        </div>
      ),
      size: 10,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  const url = buildPaginatedTableURL({
    baseUrl: `/admin/geolympic?quiz_list_id=${quiz_list_id}`,
    tableState,
  });

  const {
    data: queryData,
    isLoading,
    refetch,
  } = useQuery<
    PaginatedApiResponse<Array<GeolympicList & { status_quiz: string }>>,
    Error
  >([url], {
    keepPreviousData: true,
  });
  //#endregion  //*======== Fetch Data ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Assign Peserta' />

      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/participant?quiz_list_id=${quiz_list_id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={[
                '/admin',
                '/admin/tryout',
                '/admin/tryout/participant/assign/peserta',
              ]}
            />
            <Typography variant='h2' className='font-bold'>
              Assign Peserta
            </Typography>
          </div>
        </div>
      </header>

      <main>
        <section>
          <div className=''>
            <ServerTable
              columns={columns}
              data={queryData?.data.data_per_page ?? []}
              meta={queryData?.data.meta}
              isLoading={isLoading}
              tableState={tableState}
              setTableState={setTableState}
              className='mt-8'
              withFilter
            />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
