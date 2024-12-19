// prettier-ignore
export const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

export type State = (typeof states)[number];

export const courses = [
  {
    id: 'ES',
    name: 'Engenharia de Software',
    totalPeriods: 8,
  },
  {
    id: 'EC',
    name: 'Engenharia de Computação',
    totalPeriods: 10,
  },
  {
    id: 'EE',
    name: 'Engenharia Elétrica',
    totalPeriods: 10,
  },
  {
    id: 'EM',
    name: 'Engenharia Mecânica',
    totalPeriods: 10,
  },
  {
    id: 'ADS',
    name: 'Análise e Desenvolvimento de Sistemas',
    totalPeriods: 6,
  },
] as const;
