export const formatDate = (dateString: string): string => {
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',    // 'numeric' es un valor válido para el año
      month: 'short',     // 'short' es un valor válido para el mes abreviado
      day: '2-digit'      // '2-digit' es un valor válido para el día con dos dígitos
    };
    
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};