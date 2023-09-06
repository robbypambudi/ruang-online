import { PaymentStatus } from '@/types/entities/payment';

interface Member {
  name: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  sosmed: string;
  kartu_pelajar_url: string;
  is_ketua: boolean;
}

export interface GeolympicList {
  team_id: string;
  user_id: string;
  team_name: string;
  asal_sekolah: string;
  bukti_pembayaran_url: string;
  status: PaymentStatus;
  members: Member[];
}

export interface GeolympicTryout {
  id: string;
  roles_id: string;
  name: string;
  start_time: Date;
  end_time: Date;
  duration: number;
  code: string;
  category: string;
  summary: string;
  is_active: boolean;
  is_default: boolean;
  total_question: number;
  total_participant: number;
}

export interface GetQuizList {
  id: string;
  roles_id: string;
  name: string;
  start_time: string;
  end_time: string;
  duration: number;
  code: string;
  category: string;
  summary: string;
  is_active: boolean;
}

export interface TryoutUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// PATCH : '/admin/quiz_list?quiz_list_id=${id}&name=${data.name}'
export interface TryoutUserDetail {
  grade_id: string;
  quiz_list_id: string;
  user_id: string;
  username: string;
  email: string;
  grade: number;
  correct_answer: number;
  incorrect_answer: number;
  total_spend: number;
  question_attemp: number;
  end_date: string;
  is_active: boolean;
  status: string;
}
