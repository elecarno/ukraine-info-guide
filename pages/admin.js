import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["translation"])),
  }
});

const Index = () => {
  const { t } = useTranslation();

  return (
    <Layout hero={<Hero title={t("Admin Panel")} />} >
      <div className="flex flex-col w-full mb-10">
      </div>
    </Layout>
  );
}

export default Index;
