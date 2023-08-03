import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { FiArrowRight, FiFileText, FiUsers } from 'react-icons/fi';
import { LuFileCheck } from 'react-icons/lu';

import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import Breadcrumb from '@/components/Breadcrumb';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import SEO from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import { PaginatedApiResponse } from '@/types/api';
import { GeolympicTryout } from '@/types/entities/geolympic';

export default function TryoutAdmin() {
  const { tableState, setTableState } = useServerTable<GeolympicTryout>();

  const url = buildPaginatedTableURL({
    baseUrl: '/admin/quiz_list',
    tableState,
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<GeolympicTryout[]>,
    Error
  >([url], {
    keepPreviousData: true,
  });

  function statusQuiz(waktuMulai: string, waktuSelesai: string) {
    const waktuSekarang = new Date();

    const mulaiUjian = new Date(waktuMulai);
    const selesaiUjian = new Date(waktuSelesai);

    if (waktuSekarang > selesaiUjian) {
      return 'Selesai';
    } else if (waktuSekarang >= mulaiUjian && waktuSekarang <= selesaiUjian) {
      return 'Sedang Berlangsung';
    }
  }

  const columns: ColumnDef<GeolympicTryout>[] = [
    {
      header: 'No',
      cell: ({ row }) => <Typography>{row.index + 1}</Typography>,
      size: 0,
    },
    {
      accessorKey: 'name',
      header: 'Nama Ujian',
      size: 0,
    },
    {
      accessorKey: 'code',
      header: 'Kode Ujian',
      size: 0,
    },
    {
      accessorKey: 'category',
      header: 'Kategori',
      size: 0,
    },
    {
      accessorKey: 'start_time',
      header: 'Tanggal Mulai',
      cell: ({ row }) => (
        <Typography>
          {new Date(row.original.start_time).toLocaleDateString()} -{' '}
          {new Date(row.original.start_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {'  '}
          WIB
        </Typography>
      ),
      size: 0,
    },
    {
      accessorKey: 'end_time',
      header: 'Tanggal Selesai',
      cell: ({ row }) => (
        <Typography>
          {new Date(row.original.end_time).toLocaleDateString()} -{' '}
          {new Date(row.original.end_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {'  '}
          WIB
        </Typography>
      ),
      size: 0,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Typography>
          {!row.original.is_active ? (
            <Tag color='danger'>Tidak Aktif</Tag>
          ) : statusQuiz(row.original.start_time, row.original.end_time) ===
            'Selesai' ? (
            <Tag color='primary'>Selesai</Tag>
          ) : statusQuiz(row.original.start_time, row.original.end_time) ===
            'Sedang Berlangsung' ? (
            <Tag color='warning'>Sedang Berlangsung</Tag>
          ) : (
            <Tag color='success'>Aktif</Tag>
          )}
        </Typography>
      ),
      size: 0,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className='space-x-4'>
          <IconLink
            variant='outline'
            icon={FiUsers}
            iconClassName='text-gray-500'
            href={`/admin/tryout/users/${row.original.id}`}
          />
          <IconLink
            href={`/admin/tryout/${row.original.id}`}
            icon={FiArrowRight}
            iconClassName='text-gray-500'
          />
        </div>
      ),
      size: 0,
    },
  ];

  return (
    <DashboardLayout>
      <SEO templateTitle='Dashboard Tryout' />

      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/admin', '/admin/tryout']} />
            <Typography variant='h2' className='font-bold'>
              Dashboard Tryout
            </Typography>
          </div>
        </div>
      </header>

      <main>
        <section className='mt-6 flex gap-3'>
          <div className='flex w-fit gap-4 rounded-xl border border-outline-base p-2'>
            <div>
              <Typography variant='h3' className='font-bold'>
                Total Ujian
              </Typography>
              <Typography variant='s2' className='text-gray-500'>
                {queryData?.data?.meta.total_data ?? 0}
              </Typography>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-red-200 p-3'>
              <FiFileText className='text-2xl text-red-500' />
            </div>
          </div>
          <div className='flex w-fit gap-4 rounded-xl border border-outline-base p-2'>
            <div>
              <Typography variant='h3' className='font-bold'>
                Ujian Aktif
              </Typography>
              <Typography variant='s2' className='text-gray-500'>
                {queryData?.data?.meta.total_active_quiz ?? 0}
              </Typography>
            </div>
            <div className='flex items-center justify-center rounded-xl bg-green-200 p-3'>
              <LuFileCheck className='text-2xl text-green-500' />
            </div>
          </div>
        </section>
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