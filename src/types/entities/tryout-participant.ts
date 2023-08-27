export interface TryoutParticipant {
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
  end_date: Date;
  is_active: boolean;
  status: string;
}

export interface ParticipantAssingment {
  quiz_list_id: string;
  user: {
    user_id: string;
  }[];
}
