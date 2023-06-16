export type post = {
  id: number,
  name: string,
  category: string,
  type: string,
  link_curadoria: string,
  subtitle: string
}

export type numberMonth = {
  monthDay: number | null;
  weekDay: number | null;
  month: number | null;
  year: number | null;
  post: post | null;
}