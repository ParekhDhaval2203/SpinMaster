export default function formatDateTime(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];

    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    return `${day} ${month}, ${year} | ${time}`;
}
