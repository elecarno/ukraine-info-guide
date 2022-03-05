import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useIsAuthenticated } from "@azure/msal-react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Hero from "../Hero";
import Layout from "../Layout";

const AdminLayout = ({ title, children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated)
      router.replace("/");
  }, [isAuthenticated]);

  return (
    <>
      <AuthenticatedTemplate>
        <Layout hero={
          <Hero
            title={title}
            subcomponent={
              <div className="text-center mt-5">
                <Link href="/admin">
                  <a className="link">{t("Return to admin panel")}</a>
                </Link>
              </div>
            }
          />
        } >
          <div className="flex flex-col w-full mb-10 px-10">
            {children}
          </div>
        </Layout>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
      </UnauthenticatedTemplate>
    </>
  );
}

export default AdminLayout;
