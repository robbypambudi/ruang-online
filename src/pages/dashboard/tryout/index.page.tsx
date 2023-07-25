import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsArrowRightShort } from 'react-icons/bs';
import { GoQuestion } from 'react-icons/go';

import Button from '@/components/buttons/Button';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Typography from '@/components/typography/Typography';

export default function Tryout() {
  return (
    <DashboardLayout>
      <Typography className='font-semibold text-black' font='poppins'>
        Dashboard
      </Typography>
      <Typography
        variant='h5'
        className='font-semibold text-black'
        font='poppins'
      >
        Dashboard
      </Typography>

      <div className='mt-8 grid grid-cols-2 gap-4'>
        <div className='col-span-1 space-y-4'>
          <div className='w-full space-y-4 rounded-xl bg-surface-base p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='flex gap-2'>
              <BiUser className='text-6xl text-primary-500' />
              <div>
                <Typography variant='h6' className='font-semibold'>
                  Selamat Datang
                </Typography>
                <Typography className='font-semibold'>Robby Pambudi</Typography>
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
                Meccom - Penyisihan
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
              variant='h6'
              className='text-center font-semibold text-primary-500'
            >
              Daftar Ujian
            </Typography>
          </div>
          <div className='w-full space-y-4 rounded-xl bg-surface-base p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className='flex gap-2'>
              <AiOutlineFileText className='text-4xl' />
              <div>
                <Typography variant='h6' className='font-semibold'>
                  Simulasi Ujian UTBK
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
                        : Senin 19 April 2023 - 13:00 WIB
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
                        : Senin 19 April 2023 - 13:00 WIB
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant='primary'
                className='mt-4'
                rightIcon={BsArrowRightShort}
              >
                Mulai Ujian
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
