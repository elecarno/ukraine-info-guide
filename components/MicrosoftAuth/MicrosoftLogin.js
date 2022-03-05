import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../configs/MsalConfig";
import MsLogin from "../../icons/ms-login.svg";

const MicrosoftLogin = () => {
  const { instance } = useMsal();

  const handleLogin = () =>
    instance.loginRedirect(loginRequest).catch(e =>
      console.error("MSAL error:", e));

  return (
    <MsLogin
      alt="Sign in with Microsoft"
      onClick={handleLogin}
      className="cursor-pointer"
    />
  );
}

export default MicrosoftLogin;
