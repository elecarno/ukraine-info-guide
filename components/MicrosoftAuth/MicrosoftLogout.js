import { useMsal } from "@azure/msal-react";

const MicrosoftLogout = () => {
  const { instance } = useMsal();

  const handleLogout = () => instance.logoutRedirect();

  return (
    <p>
      <a className="link cursor-pointer" onClick={handleLogout}>Logout</a>
    </p>
  );
}

export default MicrosoftLogout;
