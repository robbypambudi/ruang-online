import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiUsers } from 'react-icons/fi';

import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import Breadcrumb from '@/components/Breadcrumb';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Typography from '@/components/typography/Typography';

import { ApiResponse, PaginatedApiResponse } from '@/types/api';
import { GeolympicTryout, TryoutUserDetail } from '@/types/entities/geolympic';

export default function TryoutUsers() {
  const router = useRouter();
  const { id } = router.query;

  const { data: dataDetailTryout } = useQuery<ApiResponse<GeolympicTryout>>([
    `/admin/quiz_list/detail?quiz_list_id=${id}`,
  ]);

  const { tableState, setTableState } = useServerTable<TryoutUserDetail[]>();
  const url = buildPaginatedTableURL({
    baseUrl: `/admin/quiz_list/user?quiz_list_id=${id}`,
    tableState,
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<TryoutUserDetail[]>,
    Error
  >([url], {
    keepPreviousData: true,
  });

  const totalUser = queryData?.data?.data_per_page?.length;

  const columns: ColumnDef<TryoutUserDetail>[] = [
    {
      header: 'No',
      cell: ({ row }) => <Typography>{row.index + 1}</Typography>,
      size: 0,
    },
    {
      accessorKey: 'username',
      header: 'Username',
      size: 0,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 0,
    },
    {
      accessorKey: 'end_date',
      header: 'Waktu Selesai',
      size: 0,
    },
    {
      accessorKey: 'grade',
      header: 'Nilai',
      size: 0,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 0,
    },
    {
      accessorKey: 'end_time',
      header: 'Tanggal Selesai',
      size: 0,
    },
  ];

  return (
    <DashboardLayout>
      <Seo templateTitle='Peserta Tryout' />

      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={['/admin', '/admin/tryout', '/admin/tryout/peserta']}
            />
            <Typography variant='h2' className='font-bold'>
              Peserta {dataDetailTryout?.data?.name}
            </Typography>
          </div>
        </div>
      </header>

      <main className='mt-6'>
        <div className='flex w-fit gap-4 rounded-xl border border-outline-base p-2'>
          <div>
            <Typography variant='h3' className='font-bold'>
              Total Peserta
            </Typography>
            <Typography variant='s2' className='text-gray-500'>
              {totalUser ?? 0}
            </Typography>
          </div>
          <div className='flex items-center justify-center rounded-xl bg-blue-200 p-3'>
            <FiUsers className='text-2xl text-blue-500' />
          </div>
        </div>

        <div className='mt-8'>
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
      </main>
    </DashboardLayout>
  );
}
