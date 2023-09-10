import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { FiEye, FiFileText, FiTrash, FiUsers } from 'react-icons/fi';
import { LuFileCheck } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';

import api from '@/lib/axios';
import { buildPaginatedTableURL } from '@/lib/table';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useServerTable from '@/hooks/useServerTable';

import Breadcrumb from '@/components/Breadcrumb';
import IconButton from '@/components/buttons/IconButton';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import SEO from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import { PaginatedApiResponse } from '@/types/api';
import { GeolympicTryout } from '@/types/entities/geolympic';

export default withAuth(TryoutAdmin, ['admin_tryout.index']);
function TryoutAdmin() {
  const { tableState, setTableState } = useServerTable<GeolympicTryout>();

  const url = buildPaginatedTableURL({
    baseUrl: '/admin/quiz_list',
    tableState,
  });

  const {
    data: queryData,
    isLoading,
    refetch,
  } = useQuery<PaginatedApiResponse<GeolympicTryout[]>, Error>([url], {
    keepPreviousData: true,
  });

  function statusQuiz(waktuMulai: Date, waktuSelesai: Date) {
    const waktuSekarang = new Date();

    const mulaiUjian = new Date(waktuMulai);
    const selesaiUjian = new Date(waktuSelesai);

    if (waktuSekarang > selesaiUjian) {
      return 'Selesai';
    } else if (waktuSekarang >= mulaiUjian && waktuSekarang <= selesaiUjian) {
      return 'Sedang Berlangsung';
    }
  }

  const { mutate: handleDelete } = useMutationToast<
    void,
    { quiz_list_id: string }
  >(
    useMutation((data) => {
      return api.delete(
        `/admin/quiz_list/soft_delete?quiz_list_id=${data.quiz_list_id}`
      );
    })
  );
  const columns: ColumnDef<GeolympicTryout>[] = [
    {
      header: 'No',
      cell: ({ row }) =>
        tableState.pagination.pageSize * tableState.pagination.pageIndex +
        row.index +
        1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Nama Ujian',
    },
    {
      accessorKey: 'code',
      header: 'Kode Ujian',
    },
    {
      accessorKey: 'category',
      header: 'Kategori',
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
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div>
          {!row.original.is_active ? (
            <Tag color='danger'>Non Aktif</Tag>
          ) : statusQuiz(row.original.start_time, row.original.end_time) ===
            'Selesai' ? (
            <Tag color='primary'>Done</Tag>
          ) : statusQuiz(row.original.start_time, row.original.end_time) ===
            'Sedang Berlangsung' ? (
            <Tag color='warning'>On Going</Tag>
          ) : (
            <Tag color='success'>Aktif</Tag>
          )}
        </div>
      ),
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
            href={`/admin/tryout/participant?quiz_list_id=${row.original.id}`}
          />
          {statusQuiz(row.original.start_time, row.original.end_time) ===
            'Selesai' && (
            <IconLink
              href={`/admin/tryout/${row.original.id}`}
              icon={FiEye}
              iconClassName='text-gray-500'
            />
          )}
          <IconButton
            icon={FiTrash}
            variant='danger'
            onClick={() =>
              handleDelete(
                { quiz_list_id: row.original.id },
                {
                  onSuccess: () => {
                    refetch();
                  },
                }
              )
            }
          />
        </div>
      ),
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
          <div className='ml-auto'>
            <ButtonLink
              href='/admin/tryout/buat'
              variant='primary'
              rightIcon={MdAdd}
            >
              Tambah Tryout
            </ButtonLink>
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
