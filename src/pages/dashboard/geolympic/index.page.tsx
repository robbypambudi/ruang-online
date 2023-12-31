import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';

type Member = {
  name: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  sosmed: string;
  kartu_pelajar_url: string;
  is_ketua: boolean;
};

type Team = {
  team_id: string;
  user_id: string;
  team_name: string;
  asal_sekolah: string;
  bukti_pembayaran_url: string;
  status: string;
  members: Member[];
};

export default withAuth(GeolympicPage, 'USER', true);
function GeolympicPage() {
  const user = useAuthStore.useUser();
  const router = useRouter();

  const { data: detailTeam } = useQuery<ApiResponse<Team>, Error>([
    `/geolympic`,
  ]);

  React.useEffect(() => {
    if (!user?.event?.is_geolympic.registration_status) {
      router.push('/dashboard/geolympic/buat');
    }
  }, [router, user]);

  if (!user?.event?.is_geolympic) {
    return null;
  }

  return (
    <DashboardLayout>
      <Seo templateTitle='Geolympic' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/dashboard', '/dashboard/geolympic']} />
            <Typography variant='h2' className='font-bold'>
              Geolympic 2023
            </Typography>
          </div>
        </div>
      </header>
      <div className='w-full md:w-1/2'>
        {user.event.is_geolympic.registration_status && (
          <>
            {user.event.is_geolympic.payment_status === 'unverified' && (
              <div className='mt-6 rounded-md border border-purple-500 bg-white p-4 shadow-md hover:shadow-lg'>
                <Typography variant='h6' className='font-bold'>
                  Thanks for registering! 🎉
                </Typography>
                <Typography className='mt-2'>
                  Your registration has been received. Please wait for the next
                  email from us, or you can stay tuned on our website. Thank
                  you!
                </Typography>

                <div className='mt-6 border-t'>
                  <ButtonLink href='/dashboard' className='mt-4'>
                    Back to Dashboard
                  </ButtonLink>
                </div>
              </div>
            )}
            {user.event.is_geolympic.payment_status === 'verified' && (
              <div className='mt-6 rounded-md border border-purple-500 bg-white p-4 shadow-md hover:shadow-lg'>
                <Typography variant='h6' className='font-bold'>
                  Your payment has been verified! 🎉
                </Typography>
                <Typography className='mt-2'>
                  Your payment has been verified. You can stay tuned on our
                  website. Thank you!
                </Typography>

                <div className='mt-6 border-t'>
                  <ButtonLink href='/dashboard/tryout' className='mt-4'>
                    Show Tryout
                  </ButtonLink>
                </div>
              </div>
            )}
          </>
        )}
        <div className='mt-6 rounded-md border border-purple-500 bg-white p-4 shadow-md hover:shadow-lg'>
          <Typography variant='h5' className='font-bold'>
            Hello, {detailTeam?.data?.team_name}
          </Typography>
          <Typography className='mt-2'>Members :</Typography>

          {detailTeam?.data?.members.map((member, index) => (
            <div key={index} className='mt-2'>
              -{' '}
              <Typography className='inline font-bold'>
                {member.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
