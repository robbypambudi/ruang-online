import * as React from 'react';
import { FiChevronLeft, FiSave } from 'react-icons/fi';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import ErrorMessage from '@/components/forms/ErrorMessage';
import Input from '@/components/forms/Input';
import RadioButton from '@/components/forms/Radio';
import TextArea from '@/components/forms/TextArea';
import ButtonLink from '@/components/links/ButtonLink';

export default function BuatTryoutForm() {
  return (
    <>
      <div className='rounded-md bg-surface-card p-6 shadow-md'>
        <div className='grid grid-cols-2 gap-12'>
          <div className='space-y-4'>
            <Input
              label='Nama Tryout'
              id='name'
              placeholder='Nama Tryout'
              validation={{
                required: 'Nama Tryout tidak boleh kosong!',
              }}
            />
            <DatePicker
              label='Tanggal Lahir'
              id='start_date'
              placeholder='Tanggal Lahir'
              validation={{ required: 'Tanggal Lahir is required' }}
            />
            <DatePicker
              label='Tanggal Selesai'
              id='end_date'
              placeholder='Tanggal Lahir'
              validation={{ required: 'Tanggal Lahir is required' }}
            />
          </div>
          <div className='space-y-4'>
            <Input
              id='code'
              label='Kode Tyout'
              placeholder='Kode Tryout'
              validation={{
                required: 'Kode Tryout tidak boleh kosong!',
              }}
              helperText='Kode Tryout harus bersifat unik'
            />
            <Input
              id='category'
              label='Kategori Tryout'
              placeholder='Kategori Tryout'
              validation={{
                required: 'Kategori Tryout tidak boleh kosong!',
              }}
            />
          </div>
        </div>
        <div className='mt-4 space-y-2'>
          <TextArea
            label='Ringkasan Tryout'
            id='summary'
            placeholder='Deskripsi'
          />
          <label
            htmlFor='status'
            className='block text-sm font-semibold text-typo'
          >
            Status Tryout
          </label>
          <div className='mt-1 grid grid-flow-col grid-rows-2'>
            <RadioButton
              label='Aktif'
              name='status'
              value='1'
              validation={{ required: 'Status is required' }}
            />
            <RadioButton
              label='Shopeepay'
              name='status'
              value='Shopeepay'
              validation={{ required: 'Shopeepay is required' }}
            />
          </div>
          <p className='text-xs text-gray-500'>
            Status tryout yang aktif akan ditampilkan di halaman utama user
          </p>
          <ErrorMessage id='status' />
        </div>
        <div className='mt-5 space-x-4'>
          <ButtonLink
            type='button'
            variant='outline'
            leftIcon={FiChevronLeft}
            href='/admin/list-tryout'
            leftIconClassName='text-gray-500'
          >
            Kembali
          </ButtonLink>
          <Button type='submit' variant='primary' leftIcon={FiSave}>
            Buat Tryout
          </Button>
        </div>
      </div>
    </>
  );
}
