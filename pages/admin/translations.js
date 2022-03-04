import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AdminLayout from "../../components/AdminLayout";
import TranslationEditor from "../../components/TranslationEditor";
import LanguagePicker from "../../components/Navbar/LanguagePicker";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["translation"])),
  }
});

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [lang, setLang] = useState(router.locale);

  return (
    <AdminLayout title={t("Edit Translations")}>
      <div className="text-center mx-auto">
        <div className="mb-5 flex justify-center">
          <LanguagePicker onChange={setLang} />
        </div>
        {lang === "en"
          ? <p>{t("English cannot be edited")}</p>
          : <TranslationEditor t={t} lang={lang} />
        }
      </div>
    </AdminLayout>
  );
}

export default Index;
