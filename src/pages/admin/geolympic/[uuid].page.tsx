import { useMutation, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { useRouter } from 'next/router';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import ImagePreview from '@/components/image/ImagePreview';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { GeolympicList } from '@/types/entities/geolympic';

export default withAuth(DetailPesertaGeolympic, 'ADMIN');

type StatusPembayaran = {
  status: string;
  geolympic_team_id: string;
};

function DetailPesertaGeolympic() {
  const router = useRouter();
  const { uuid } = router.query;
  const url = `/admin/geolympic?geolympic_team_id=${uuid}`;
  const { data: dataPeserta, refetch } = useQuery<
    ApiResponse<GeolympicList>,
    Error
  >([url]);

  const { mutate: updateStatusPembayaran } = useMutationToast<
    void,
    StatusPembayaran
  >(
    useMutation((status) => {
      return api.post('/admin/geolympic/pembayaran', status);
    })
  );

  const handleUpdateStatusPembayaran = (
    status: string,
    geolympic_team_id: string
  ) => {
    updateStatusPembayaran(
      { status, geolympic_team_id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <Seo templateTitle='Detail Peserta Geolympic' />
      <div className='flex w-full flex-col justify-between md:flex-row'>
        <div>
          <Typography as='h6' variant='s2' className='text-[#8A62D0]'>
            Geolympic
          </Typography>
          <Typography as='h2' variant='j2' className='text-typo'>
            Daftar Peserta
          </Typography>
        </div>
        <div className='flex flex-col items-end gap-4'>
          <Breadcrumb
            crumbs={[
              '/dashboard',
              '/admin/tryout',
              '/admin/tryout/detail-peserta',
            ]}
          />
        </div>
      </div>

      <main className='flex flex-col gap-5 p-6 md:flex-row'>
        <div className='flex w-full flex-col'>
          <div className='flex'>
            <Typography
              variant='h5'
              color='white'
              className='w-full rounded-t-xl bg-[#8A62D0] px-6 py-2'
              font='poppins'
            >
              Bukti Pembayaran
            </Typography>
          </div>
          <div className='rounded-xl rounded-t-none border border-[#F0F2F5] bg-white p-6'>
            <div className='w-full'>
              {dataPeserta && (
                <ImagePreview
                  imgSrc={dataPeserta?.data.bukti_pembayaran_url}
                  label='Bukti Pembayaran'
                  alt='Bukti Pembayaran'
                  width={300}
                  height={400}
                  imgClassName='rounded-xl'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-y-10 self-stretch bg-white p-6'>
          <div className='flex justify-between gap-10 self-stretch'>
            <div className='flex flex-col-reverse items-center justify-center gap-10 self-stretch lg:flex-row'>
              <div className='flex flex-col'>
                <Typography variant='b2' color='tertiary'>
                  Nama Tim
                </Typography>
                <Typography variant='s2' color='primary'>
                  {dataPeserta?.data.team_name}
                </Typography>
              </div>
            </div>
            <div className='flex gap-4'>
              <Button
                variant='outline'
                className={clsxm(
                  'border-2 border-[#E22718] px-6 py-2 text-[#E22718]',
                  'hover:bg-[#E22718] hover:text-white disabled:border-gray-300 disabled:bg-white disabled:text-gray-400'
                )}
                size='base'
                disabled={dataPeserta?.data.status === 'unverified'}
                onClick={() =>
                  handleUpdateStatusPembayaran(
                    'unverified',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    dataPeserta!.data.team_id
                  )
                }
              >
                Tolak
              </Button>
              <Button
                variant='outline'
                className={clsxm(
                  'border-2 border-[#00CC66] px-6 py-2 text-[#00CC66]',
                  'hover:bg-[#00CC66] hover:text-white disabled:border-gray-300 disabled:bg-white disabled:text-gray-400'
                )}
                size='base'
                disabled={dataPeserta?.data.status === 'verified'}
                onClick={() =>
                  handleUpdateStatusPembayaran(
                    'verified',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    dataPeserta!.data.team_id
                  )
                }
              >
                Terima
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-10'>
            <div className='flex flex-row gap-10 lg:flex-col'>
              <div className='flex flex-col'>
                <Typography variant='b2' color='tertiary'>
                  Asal Sekolah
                </Typography>
                <Typography variant='s2' color='primary'>
                  {dataPeserta?.data.asal_sekolah}
                </Typography>
              </div>
            </div>
            <hr className='w-full border border-[#9AA2B1]' />
          </div>

          {dataPeserta?.data.members &&
            dataPeserta?.data.members
              .sort((a, b) =>
                a.is_ketua === b.is_ketua ? 0 : a.is_ketua ? -1 : 1
              )
              .map((member, index) => (
                <div key={index}>
                  <div className='flex flex-col gap-10'>
                    <Typography
                      variant='h2'
                      color='primary'
                      className='font-bold'
                    >
                      {member.is_ketua
                        ? 'Biodata Ketua Tim'
                        : `Biodata Anggota ${index}`}
                    </Typography>

                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-10 md:flex-row'>
                          <div className='flex flex-col'>
                            <Typography variant='b2' color='tertiary'>
                              Nama
                            </Typography>
                            <Typography variant='s2' color='primary'>
                              {member.name}
                            </Typography>
                          </div>
                          <div className='flex flex-col'>
                            <Typography variant='b2' color='tertiary'>
                              Sosial Media
                            </Typography>
                            <Typography variant='s2' color='primary'>
                              {member.sosmed}
                            </Typography>
                          </div>
                        </div>

                        <div className='flex flex-col gap-10 md:flex-row'>
                          <div className='flex flex-col'>
                            <Typography variant='b2' color='tertiary'>
                              Tempat Tanggal Lahir
                            </Typography>
                            <Typography variant='s2' color='primary'>
                              {member.tempat_lahir},{' '}
                              {member.tanggal_lahir.slice(0, 10)}
                            </Typography>
                          </div>
                        </div>

                        <div className='flex flex-col gap-10 md:flex-row'>
                          <div className='flex flex-col'>
                            <Typography variant='b2' color='tertiary'>
                              Alamat
                            </Typography>
                            <Typography variant='s2' color='primary'>
                              {member.alamat}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <div className='flex'>
                          <Typography
                            variant='h5'
                            color='white'
                            className='rounded-tl-xl bg-[#8A62D0] px-6 py-2'
                            font='montserrat'
                          >
                            Kartu Pelajar
                          </Typography>
                          <Typography
                            variant='h5'
                            color='white'
                            className='rounded-br-xl bg-[#BCBCBC] px-6 py-2'
                            font='montserrat'
                          >
                            Foto 3x4
                          </Typography>
                        </div>
                        <div className='rounded-xl rounded-tl-none border border-[#F0F2F5] p-6'>
                          <div className='w-full'>
                            {dataPeserta && (
                              <ImagePreview
                                imgSrc={member.kartu_pelajar_url}
                                label='Bukti Pembayaran'
                                alt='Bukti Pembayaran'
                                width={300}
                                height={400}
                                imgClassName='rounded-xl'
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='w-full border border-[#9AA2B1]' />
                  </div>
                </div>
              ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
