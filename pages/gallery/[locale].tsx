import { withIronSessionSsr } from "iron-session/next";
import { getImagesFromFs } from "../../services/images/GetImagesFromFs";
import { ironOptions } from "../../lib/ironConfig";
import { Box } from "@chakra-ui/react";
import Footer from "../../components/nav/Footer";
import { useEffect, useState } from "react";
import getSessionLanguage from "../../services/language/getSessionLanguage";
import Gallery from "../../components/gallery/Gallery";
import { NextPage } from "next";

type Props = {
  sessionUser: any;
  images: string[];
  locale: string;
};
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...context }) {
    const sessionUser: any = req.session.user;
    if (
      !sessionUser ||
      (sessionUser?.isAdmin !== true && sessionUser?.isLoggedIn === false)
    ) {
      return { redirect: { destination: "/", permanent: false } };
    }
    // TODO: change to get images from db -> cloudflare
    const locale = context.query.locale || "";
    const images = getImagesFromFs(locale.toString());
    return { props: { sessionUser, images, locale } };
  },
  ironOptions
);

const LocaleGallery: NextPage<Props> = ({
  sessionUser,
  images,
  locale,
}: Props) => {
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    setLanguage(getSessionLanguage());
  }, []);
  return (
    <Box position="relative" minH="100vh">
      <Gallery images={images} location={locale} />
      <Footer
        isLoggedIn={sessionUser.isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </Box>
  );
};
export default LocaleGallery;
