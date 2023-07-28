import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { BsCloudUpload, BsPeopleFill, BsPersonFill } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { GeolympicTryout } from '@/types/entities/geolympic';

export default withAuth(DetailTryoutAdmin, 'ADMIN');
function DetailTryoutAdmin() {
  const router = useRouter();
  const { id } = router.query;
  const url = `/quiz_list/detail?quiz_list_id=${id}`;
  const { data: dataDetailQuizList } = useQuery<ApiResponse<GeolympicTryout>>([
    url,
  ]);

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
            <Breadcrumb
              crumbs={[
                '/admin',
                '/dashboard/tryout',
                '/dashboard/tryout/detail-tryout',
              ]}
            />
            <Typography variant='h2' className='font-bold'>
              Detail Tryout
            </Typography>
          </div>
        </div>
      </header>

      <main className='flex flex-col gap-y-6 py-6'>
        <section className='flex flex-col-reverse items-center justify-between rounded-xl bg-white p-2.5 shadow-lg lg:flex-row'>
          <div className='flex flex-col justify-between gap-y-10 px-5 py-3'>
            <Typography
              className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
              variant='h1'
              font='montserrat'
            >
              Geosentric ITS 2023 -{' '}
              {dataDetailQuizList?.data.is_active ? 'Aktif' : 'Belum Aktif'}
            </Typography>
            <Typography
              className='text-center text-5xl font-bold lg:text-left'
              variant='h1'
              font='montserrat'
            >
              {dataDetailQuizList?.data.name}
            </Typography>

            <div className='flex gap-3'>
              <div className='flex flex-col items-start justify-center gap-3'>
                <div className='flex items-center justify-center gap-3'>
                  <div className=''>
                    <BsPersonFill
                      className='text-[#1A3FC4]'
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className='' variant='h1' font='montserrat'>
                    {dataDetailQuizList?.data.total_participant} User
                  </Typography>
                </div>
                <div className='flex items-center justify-center gap-3'>
                  <div className=''>
                    <BsPersonFill
                      className='text-[#1A3FC4]'
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className='' variant='h1' font='montserrat'>
                    {dataDetailQuizList?.data.total_question} Soal |{' '}
                    {dataDetailQuizList?.data.duration} Menit
                  </Typography>
                </div>
              </div>
              <div className='flex flex-col items-start gap-2.5 p-2.5'>
                <Typography className='' variant='h1' font='montserrat'>
                  Kode Tryout
                </Typography>
                <Typography
                  className='font-bold text-[#1A3FC4]'
                  variant='h1'
                  font='montserrat'
                >
                  {dataDetailQuizList?.data.code}
                </Typography>
              </div>
            </div>

            <div className='flex gap-3'>
              <Button
                className='shadow-lg'
                variant='primary'
                size='lg'
                rightIcon={BsCloudUpload}
              >
                Aktif
              </Button>
              <Button
                className='border border-[#37B965] bg-[#37B965] shadow-lg hover:bg-[#2a8d4d]'
                variant='primary'
                size='lg'
                rightIcon={HiOutlineDocumentAdd}
              >
                Buat Soal
              </Button>
              <Button
                className='shadow-lg'
                variant='warning'
                size='lg'
                rightIcon={BsPeopleFill}
              >
                Peserta Tryout
              </Button>
            </div>
          </div>
          <div>
            <NextImage
              src='/images/dashboard/detail-tryout.png'
              width={600}
              height={413.415}
              alt='Tryout Detail'
            />
          </div>
        </section>

        <section className='flex flex-col items-center justify-center gap-2.5 rounded-xl bg-white p-8 shadow-xl'>
          <Typography
            className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
            variant='h2'
            font='montserrat'
          >
            Ringkasan
          </Typography>
          <Typography className='' variant='b2' font='montserrat'>
            {dataDetailQuizList?.data.summary}
          </Typography>
        </section>
      </main>
    </DashboardLayout>
  );
}