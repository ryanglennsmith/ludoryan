import { Box, Flex } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EnterGuestInfo from "../components/guest/EnterGuestInfo";
import Footer from "../components/nav/Footer";
import { useEffect, useState } from "react";
import IConfirmedGuest from "../types/IConfirmedGuest";
import { ironOptions } from "../lib/ironConfig";
import { withIronSessionSsr } from "iron-session/next";
type Props = { user: GuestTemplate; sessionUser: any };

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...context }) {
    console.log(context.query);
    const sessionUser: any = req.session.user;
    if (
      sessionUser?.isAdmin !== true &&
      (sessionUser?.isLoggedIn === false ||
        sessionUser?.id !== context.query.id)
    ) {
      return { notFound: true };
    }
    const response = await fetch(
      `http://localhost:3000/api/${context.query.id}`
    );
    const user = await response.json();
    return { props: { user, sessionUser } };
  },
  ironOptions
);
const GuestPage: NextPage<Props> = ({ user, sessionUser }: Props) => {
  const router = useRouter();
  const uuid = router.query;
  const bringADate = (user: GuestTemplate) => {
    const date = {
      kids: 0,
      bus: false,
      plusOne: {
        confirmed: true,
      },
    };
    if (user.plusOneName === undefined) {
      return undefined;
    }
    if (user.isInvitedToItaly && user.isInvitedToUSA) {
      return {
        italy: date,
        usa: date,
      };
    } else if (user.isInvitedToItaly) {
      return {
        italy: date,
      };
    } else if (user.isInvitedToUSA) {
      return {
        usa: date,
      };
    }
  };
  const [confirmedGuest, setConfirmedGuest] = useState<IConfirmedGuest>({
    invitedToItaly: user.isInvitedToItaly,
    invitedToUSA: user.isInvitedToUSA,
    id: user.id,
    firstName: user.name,
    plusOneFirstName: user.plusOneName || undefined,
  });
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    const getSessionLanguage = (): number => {
      if (sessionStorage.getItem("language") !== undefined) {
        return Number(sessionStorage.getItem("language"));
      } else {
        return 0;
      }
    };
    setLanguage(getSessionLanguage());
  }, []);
  console.log(user);
  console.log(confirmedGuest);
  return (
    <>
      {" "}
      <Box position="relative" minH="100vh">
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          pb="4.5rem"
        >
          <EnterGuestInfo
            language={language}
            user={user}
            confirmedGuest={confirmedGuest}
            setConfirmedGuest={setConfirmedGuest}
          />
        </Flex>
        <Footer
          isLoggedIn={sessionUser.isLoggedIn}
          language={language}
          setLanguage={setLanguage}
        />
      </Box>
    </>
  );
};
export default GuestPage;
