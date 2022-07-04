export interface SignUpFields {
  readonly email: string;
  readonly login: string;
  readonly phone: string;
  readonly birth_date: Date;
  readonly password: string;
  readonly first_name: string;
  readonly patronymic?: string;
  readonly last_name: string;
  readonly about_yourself?: string;
  readonly gender: string;
  readonly student_card?: string;
  readonly university_id?: number;
}
