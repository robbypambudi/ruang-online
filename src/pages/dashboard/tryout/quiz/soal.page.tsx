// import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import Radio from '@/components/forms/Radio';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

// type SoalForm = {
//   email: string;
// };

export default withAuth(SoalPage, 'USER', true);
function SoalPage() {
  const methods = useForm();
  // const { handleSubmit } = methods;
  // const { mutate } = useMutation((data: SoalForm) => {
  //   return api.post('/api/soal', data);
  // });
  // const onSubmit = (data: SoalForm) => {
  //   mutate(data);
  // };
  return (
    <DashboardLayout>
      <Seo templateTitle='Quiz' />

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
                '/dashboard',
                '/dashboard/tryout',
                '/dashboard/tryout/quiz/soal',
              ]}
            />
            <Typography variant='h2' className='font-bold'>
              Quiz
            </Typography>
          </div>
        </div>
      </header>

      <div className='py-6 '>
        <div className='flex flex-col gap-6 rounded-xl p-3 lg:flex-row'>
          {/* SOAL */}
          <div className='flex w-full flex-col gap-6 rounded-xl bg-white px-5 py-3 shadow-xl'>
            {/* Nomoer Soal dan sisa waktu */}
            <div className='flex h-auto w-full items-center justify-between'>
              <Typography
                variant='h1'
                className='flex gap-2.5 rounded-xl bg-[#D8E7FF] px-8 py-3 text-[#1A3FC4]'
              >
                Soal 1
              </Typography>
              <Typography variant='s2' className=''>
                Sisa Waktu : <span className='text-[#1A3FC4]'>01:23:42</span>
              </Typography>
            </div>

            {/* Soal */}
            <div className='flex flex-col gap-3 border-2 border-[#D3D6CC] p-3'>
              <Typography variant='s2' className=''>
                Apa kepanjangan akpol?
              </Typography>
              <div className='flex flex-col gap-2.5 p-3'>
                <FormProvider {...methods}>
                  {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                  <Radio
                    label='A. Akademi Kepolisian'
                    name='answer'
                    value='akademi_kepolisian'
                  />
                  <Radio
                    label='A. Akademi Kepolisian'
                    name='answer'
                    value='akademi_kepolisian'
                  />
                  <Radio
                    label='A. Akademi Kepolisian'
                    name='answer'
                    value='akademi_kepolisian'
                  />
                  {/* </form> */}
                </FormProvider>
              </div>
            </div>

            {/* Button */}
            <div className='flex justify-between'>
              <Button leftIcon={FiArrowLeft}>Soal Sebelumnya</Button>
              <Button variant='warning'>Ragu-ragu</Button>
              <Button rightIcon={FiArrowRight}>Soal Berikutnya</Button>
            </div>
          </div>

          {/* List soal */}
          <div className='flex flex-col gap-3 rounded-xl bg-white shadow-xl'>
            <div className='flex gap-2.5 border-b-2 border-b-[#D3D6CC] p-3'>
              <Typography variant='h1'>Nomor Soal</Typography>
            </div>

            <div className='flex h-96 w-96 flex-wrap gap-3 px-4 py-10'></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
