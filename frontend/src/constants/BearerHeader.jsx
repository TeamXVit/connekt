const token = localStorage.getItem("Connekt-token")
const BearerHeader = `Bearer ${token}`;
export default BearerHeader;