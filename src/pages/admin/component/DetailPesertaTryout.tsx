import React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import Modal from '@/components/modal/Modal';
import NextImageLightbox from '@/components/NextImageLightbox';
import Typography from '@/components/typography/Typography';

import { GeolympicList } from '@/types/entities/geolympic';

export default function DetailPesertaTryout({
  open,
  data,
  setOpen,
}: {
  open: boolean;
  data: {
    members: GeolympicList['members'];
    team_name: string;
    team_id: string;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={`List Member ${data?.team_name}`}
    >
      <Modal.Section>
        {data && (
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <Typography variant='h3'>
                Jumlah Anggota : {data.members.length}
              </Typography>
              <ButtonLink href={`/admin/geolympic/${data.team_id}`} size='sm'>
                Lihat Detail
              </ButtonLink>
            </div>
            {data.members.map((member, index) => (
              <div key={index} className='rounded border border-purple-400 p-2'>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Nama
                  </Typography>
                  <Typography variant='b2' className='col-span-3'>
                    : {member.name}
                  </Typography>
                </div>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Tanggal Lahir
                  </Typography>
                  <Typography variant='b2' className='col-span-3'>
                    : {new Date(member.tanggal_lahir).toLocaleDateString()}
                  </Typography>
                </div>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Tempat Lahir
                  </Typography>
                  <Typography variant='b2' className='col-span-3'>
                    : {member.tempat_lahir}
                  </Typography>
                </div>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Alamat
                  </Typography>
                  <Typography variant='b2' className='col-span-3'>
                    : {member.alamat}
                  </Typography>
                </div>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Sosmed
                  </Typography>
                  <Typography variant='b2' className='col-span-3'>
                    : {member.sosmed}
                  </Typography>
                </div>
                <div className='grid grid-cols-4'>
                  <Typography variant='b2' className='col-span-1'>
                    Kartu Pelajar
                  </Typography>
                  <NextImageLightbox
                    src={member.kartu_pelajar_url}
                    alt='Kartu pelajaar'
                    className='col-span-3'
                    layout='responsive'
                    width={200}
                    height={100}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Section>
    </Modal>
  );
}
