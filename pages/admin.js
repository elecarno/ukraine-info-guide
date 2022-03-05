import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import {
  MicrosoftLogin,
  MicrosoftLogout,
} from "../components/MicrosoftAuth";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["translation"])),
  }
});

const AdminPage = () => {
  const { t } = useTranslation();

  return (
    <Layout hero={<Hero title={t("Admin Panel")} />} >
      <UnauthenticatedTemplate>
        <div className="mt-10">
          <MicrosoftLogin />
        </div>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <div className="flex flex-col items-center space-y-5">
          <Link href="/admin/translations">
            <a className="link">{t("Edit Translations")}</a>
          </Link>

          <div className="pt-5">
            <MicrosoftLogout />
          </div>
        </div>
      </AuthenticatedTemplate>
    </Layout>
  );
}

export default AdminPage;
