import Link from "next/link";
import { useTranslation } from "next-i18next";
import Hero from "../Hero";
import Layout from "../Layout";

const AdminLayout = ({ title, children }) => {
  const { t } = useTranslation();

  return (
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
  );
}

export default AdminLayout;
