import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { FiArrowRight, FiEye } from 'react-icons/fi';

import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import Breadcrumb from '@/components/Breadcrumb';
import IconButton from '@/components/buttons/IconButton';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import DetailPesertaTryout from '@/pages/admin/component/DetailPesertaTryout';

import { PaginatedApiResponse } from '@/types/api';
import { GeolympicList } from '@/types/entities/geolympic';
import { PAYMENT_STATUS } from '@/types/entities/payment';

export default withAuth(DashboardAdminPage, ['admin.index'], true);
function DashboardAdminPage() {
  const [selectedData, setSelectedData] = React.useState<{
    members: GeolympicList['members'];
    team_name: string;
    team_id: string;
  } | null>(null);
  const [openDetailMember, setOpenDetailMember] = React.useState(false);
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<GeolympicList>();

  const columns: ColumnDef<GeolympicList>[] = [
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
        <Tag color={row.original.status === 'verified' ? 'success' : 'warning'}>
          {PAYMENT_STATUS[row.original.status]}
        </Tag>
      ),
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className='space-x-4'>
          <IconButton
            variant='outline'
            icon={FiEye}
            onClick={() => {
              setOpenDetailMember(true);
              setSelectedData({
                members: row.original.members,
                team_name: row.original.team_name,
                team_id: row.original.team_id,
              });
            }}
          />
          <IconLink
            href={`/admin/geolympic/${row.original.team_id}`}
            icon={FiArrowRight}
            iconClassName='text-gray-500'
          />
        </div>
      ),
      size: 10,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  const url = buildPaginatedTableURL({
    baseUrl: '/admin/geolympic',
    tableState,
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<GeolympicList[]>,
    Error
  >([url], {
    keepPreviousData: true,
  });

  //#endregion  //*======== Fetch Data ===========

  return (
    <DashboardLayout>
      <Seo templateTitle='Admin' />

      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/admin']} />
            <Typography variant='h2' className='font-bold'>
              Welcome Back
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
      {selectedData && (
        <DetailPesertaTryout
          data={selectedData}
          setOpen={setOpenDetailMember}
          open={openDetailMember}
        />
      )}
    </DashboardLayout>
  );
}
