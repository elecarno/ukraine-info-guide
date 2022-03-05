import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const router = useRouter();
  const windowType = typeof window;

  useEffect(() => {
    if (windowType !== "undefined")
      router.replace(`/admin${window.location.hash}`);
  }, [windowType, router]);

  return null;
};

export default AuthPage;
