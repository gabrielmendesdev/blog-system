export const formatDate = (value: string) => {
  const postDate = new Date(value); // Converte a string ISO para um objeto Date
  const today = new Date(); // Data atual
  const yesterday = new Date(); // Data de ontem
  yesterday.setDate(today.getDate() - 1); // Configura ontem

  // Remove o tempo das datas para comparações apenas de dia/mês/ano
  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const normalizedPostDate = normalizeDate(postDate);
  const normalizedToday = normalizeDate(today);
  const normalizedYesterday = normalizeDate(yesterday);

  // Formata o horário em HH:mm
  const hours = postDate.getHours().toString().padStart(2, "0");
  const minutes = postDate.getMinutes().toString().padStart(2, "0");
  const time = `${hours}h${minutes}`;

  if (normalizedPostDate.getTime() === normalizedToday.getTime()) {
    return `Hoje às ${time}`; // Post é de hoje
  }

  if (normalizedPostDate.getTime() === normalizedYesterday.getTime()) {
    return `Ontem às ${time}`; // Post é de ontem
  }

  // Formata para DD/MM ou DD/MM/YYYY dependendo do ano
  const day = postDate.getDate().toString().padStart(2, "0");
  const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
  const year = postDate.getFullYear();

  const datePart =
    year < today.getFullYear() ? `${day}/${month}/${year}` : `${day}/${month}`;
  return `${datePart} às ${time}`;
};
