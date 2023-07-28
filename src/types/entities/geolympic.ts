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
  status: string;
  members: Member[];
}

export interface GeolympicTryout {
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
  total_question: number;
  total_participant: number;
}
