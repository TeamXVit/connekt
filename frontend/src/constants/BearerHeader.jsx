const token = localStorage.getItem("Connekt-token").replace(/['"]+/g, '');
const BearerHeader = `Bearer ${token}`;
export default BearerHeader;