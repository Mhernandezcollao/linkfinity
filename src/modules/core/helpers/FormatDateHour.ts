export const formatDateHour = (dateString: string) => {
    const date = new Date(dateString);

    // Obtener el día, mes y año
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const year = date.getFullYear();
  
    // Obtener las horas y minutos
    const hours = String(date.getHours()).padStart(2, '0'); // Asegura que las horas siempre tengan dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura que los minutos siempre tengan dos dígitos
  
    // Formatear el string
    return `${day}, ${month} de ${year} / ${hours}:${minutes} hrs.`;
};