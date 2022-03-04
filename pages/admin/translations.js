import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AdminLayout from "../../components/AdminLayout";
import LanguagePicker from "../../components/Navbar/LanguagePicker";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["translation"])),
  }
});

const Editor = ({ lang }) => {
  return (
    <p>Editing {lang} translations</p>
  );
}

const Index = () => {
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  return (
    <AdminLayout title={t("Edit Translations")}>
      <div className="text-center mx-auto">
        <div className="mb-5 flex justify-center">
          <LanguagePicker onChange={setLang} />
        </div>
        {lang === "en"
          ? <p>{t("English cannot be edited")}</p>
          : <Editor lang={lang} />
        }
      </div>
    </AdminLayout>
  );
}

export default Index;
