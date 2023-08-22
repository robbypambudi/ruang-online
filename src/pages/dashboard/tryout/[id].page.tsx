import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { HiDocument, HiNewspaper } from 'react-icons/hi';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { setAllQuestions } from '@/lib/localstorage';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import Tabs from '@/pages/dashboard/tryout/component/Tabs';

import { ApiResponse } from '@/types/api';
import { GeolympicTryout } from '@/types/entities/geolympic';
import { QusetionsList, StartEndQuiz } from '@/types/entities/question';

export const TabsData = [
  {
    TabTitle: 'Ringkasan',
    TabID: 'ringkasan',
    LeftIcon: HiDocument,
    href: '#',
  },
  {
    TabTitle: 'Peraturan',
    TabID: 'peraturan',
    LeftIcon: HiNewspaper,
    href: '#',
  },
];

const TabsContents = [
  {
    TabID: 'ringkasan',
    TabContent:
      'This is contents Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur maasdasd sda sdasd sadasd sdasd sd sadsdsdsadsdsdsadsadsadsadsadsadsadsas sdsad ashdsahdj sahdja dhsa jdhsaj dsa dsaj dsadsa dshdsjakdkashd sajd askhdksaj djsha kd sad sakd ksa dsad asd sad sa dsahjda skdsakdaskdhaskd asdassdadsdasdas s dand sa dasdasd asdbsahdb sahdasdbas hdb ahdabddassdsa dshabd sabdsahbd sahbd sahd asadlasdasl dsajdb alfsadfjd ljkfsabd sadasd',
  },
  {
    TabID: 'peraturan',
    TabContent: 'This is Peraturan Content',
  },
];

export default withAuth(DetailTryoutAdmin, ['tryout.index']);
function DetailTryoutAdmin() {
  const router = useRouter();
  const { user } = useAuthStore();

  const { id } = router.query as { id: string };
  const [tabActive, setTabActive] = React.useState('ringkasan');

  const url = `/quiz_list/detail?quiz_list_id=${id}`;
  const { data: dataDetailQuizList } = useQuery<ApiResponse<GeolympicTryout>>([
    url,
  ]);

  const { mutate: startQuiz } = useMutationToast<
    ApiResponse<QusetionsList[]>,
    StartEndQuiz
  >(
    useMutation(
      async (data) => {
        return api
          .post('/quiz_list/quiz-attempt', data)
          .then(async () => {
            return api.get<ApiResponse<QusetionsList[]>>(
              `/quiz_list/question-list?quiz_list_id=${data.quiz_list_id}`
            );
          })
          .then((res) => {
            if (res.data.data.length !== 0) {
              setAllQuestions(res.data.data);
              return res.data;
            } else {
              throw new Error(res.data.message);
            }
          });
      },
      {
        onSuccess: () => {
          router.push(`/dashboard/tryout/quiz/${id}?soal=1`);
        },
      }
    )
  );

  //#region  //*=========== Save Question ===========
  const SaveQuestions = async () => {
    await startQuiz({
      quiz_list_id: id,
      start_attempt: true,
      end_attempt: false,
    });
  };
  //#endregion  //*======== Save Question ===========

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
                '/dashboard',
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

      <main className='flex w-full flex-col gap-y-6 py-6'>
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
                      className='text-primary-500'
                      width={50}
                      height={50}
                    />
                  </div>
                  <Typography className='' variant='h1' font='montserrat'>
                    {user?.name}
                  </Typography>
                </div>
                <div className='flex items-center justify-center gap-3'>
                  <div className=''>
                    <BiSolidInfoCircle
                      className='text-primary-500'
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
            </div>

            <div className='flex gap-3'>
              <Button
                onClick={() => {
                  SaveQuestions();
                }}
                className='shadow-lg'
                variant='primary'
                size='lg'
                rightIcon={FiChevronRight}
              >
                Mulai Ujian
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

        <section className='flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 shadow-xl'>
          <div className='flex'>
            {TabsData.map((tab, index) => (
              <Tabs
                className={clsxm(
                  tabActive === tab.TabID
                    ? [
                        'border-primary-600 !text-primary-600 dark:border-primary-500 dark:text-primary-500',
                        'hover:border-primary-700 hover:text-primary-700',
                      ]
                    : [
                        'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300',
                        'border-transparent',
                        'hover:border-gray-400',
                      ]
                )}
                key={index}
                OnClick={() => setTabActive(tab.TabID)}
                TabTitle={tab.TabTitle}
                LeftIcon={tab.LeftIcon}
              />
            ))}
          </div>
          <div>
            {TabsContents.map(
              (tabContent, index) =>
                tabContent.TabID === tabActive && (
                  <div key={index}>{tabContent.TabContent}</div>
                )
            )}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
