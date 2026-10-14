export const LOW_STOCK_THRESHOLD = 5;

export const money = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type Greeting = "Buenos días" | "Buenas tardes" | "Buenas noches";

export const getGreeting = (date: Date): Greeting => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const percentChange = (current: number, previous: number) =>
  previous === 0 ? null : ((current - previous) / previous) * 100;
