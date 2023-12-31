import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsArrowRightShort } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { GoQuestion } from 'react-icons/go';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { GetQuizList } from '@/types/entities/geolympic';

export default withAuth(DashboardTryout, ['tryout.index'], true);
function DashboardTryout() {
  const router = useRouter();
  const user = useAuthStore.useUser();

  const url = '/quiz_list';
  const { data: QuizListData, isLoading } = useQuery<
    ApiResponse<GetQuizList[]>
  >([url]);
  React.useEffect(() => {
    if (user?.event?.is_geolympic.payment_status === 'unregistered') {
      router.push('/dashboard/geolympic/buat');
    }
    if (user?.event?.is_geolympic.payment_status === 'unverified') {
      router.push('/dashboard/geolympic');
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  if (
    user.event.is_geolympic.payment_status === 'unregistered' ||
    user.event.is_geolympic.payment_status === 'unverified'
  ) {
    return (
      <DashboardLayout>
        <header className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <IconLink
              href='/dashboard'
              icon={FiArrowLeft}
              iconClassName='text-gray-500'
            />
            <div className='flex flex-col'>
              <Breadcrumb crumbs={['/dashboard', '/dashboard/tryout']} />
              <Typography variant='h2' className='font-bold'>
                Geolympic 2023
              </Typography>
            </div>
          </div>
        </header>

        <div>
          <Typography variant='h3' className='font-semibold'>
            Anda tidak dapat mengakses halaman ini
          </Typography>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Seo templateTitle='Detail Tryout' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/dashboard', '/dashboard/tryout']} />
            <Typography variant='h2' className='font-bold'>
              Geolympic 2023
            </Typography>
          </div>
        </div>
      </header>

      <div className='mt-8 grid grid-cols-2 gap-4'>
        <div className='col-span-1 space-y-4'>
          <div className='w-full space-y-4 rounded-xl bg-surface-base p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='flex gap-2'>
              <BiUser className='text-6xl text-primary-500' />
              <div>
                <Typography variant='h3' className='font-semibold'>
                  Selamat Datang
                </Typography>
                <Typography className='font-semibold'>{user.name}</Typography>
              </div>
            </div>
            <div className='flex border-t-2 border-dashed border-gray-400 pt-4'>
              <Typography variant='b1' className='font-normal'>
                Kamu terdaftar di kategori perlombaan :
              </Typography>
              <Typography
                variant='b1'
                className='ml-2 font-semibold text-primary-500'
              >
                Geolympic 2023
              </Typography>
            </div>
          </div>
          <div className='w-full space-y-4 rounded-xl bg-surface-base p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='flex gap-2'>
              <GoQuestion className='text-6xl text-primary-500' />
              <div className='my-auto'>
                <Typography variant='h6' className='font-semibold'>
                  Pengumuman
                </Typography>
              </div>
            </div>
            <div className='flex border-t-2 border-dashed border-gray-400 pt-4'>
              <ul className='list-inside list-disc'>
                <li>
                  <Typography variant='b1' className='inline font-normal'>
                    Kejujuran adalah kunci utama dalam perlombaan ini.
                  </Typography>
                </li>
                <li>
                  <Typography variant='b1' className='inline font-normal'>
                    Jangan lupa untuk selalu mematuhi peraturan yang ada.
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col-span-1 space-y-4'>
          <div className='w-full rounded-xl bg-primary-100 px-8 py-3'>
            <Typography
              variant='h3'
              className='text-center font-semibold text-primary-500'
            >
              Daftar Ujian
            </Typography>
          </div>
          <div className='w-full space-y-4 rounded-xl bg-surface-base p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            {(QuizListData?.data.length === 0 || !QuizListData) && (
              <div className='flex flex-col items-center justify-center space-y-4'>
                <div className='flex flex-col items-center justify-center space-y-4'>
                  <GoQuestion className='text-6xl text-primary-500' />
                  {isLoading ? (
                    <Typography variant='h3' className='font-semibold'>
                      Loading...
                    </Typography>
                  ) : (
                    <Typography variant='h3' className='font-semibold'>
                      Belum ada ujian
                    </Typography>
                  )}
                </div>
              </div>
            )}
            {QuizListData?.data.map((quiz, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <AiOutlineFileText className='text-4xl' />
                  <div>
                    <Typography variant='h4' className='font-semibold'>
                      {quiz.name}
                    </Typography>
                  </div>
                </div>
                <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td>
                          <Typography variant='b1' className='font-normal'>
                            Mulai
                          </Typography>
                        </td>
                        <td>
                          <Typography variant='b1' className='font-normal'>
                            : {quiz.start_time}
                          </Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography variant='b1' className='font-normal'>
                            Selesai
                          </Typography>
                        </td>
                        <td>
                          <Typography variant='b1' className='font-normal'>
                            : {quiz.end_time}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ButtonLink
                    variant='primary'
                    className='mt-4'
                    rightIcon={BsArrowRightShort}
                    href={`/dashboard/tryout/${quiz.id}`}
                  >
                    Lihat Ujian
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
