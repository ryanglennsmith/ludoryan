/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EnterGuestInfo from "../components/guest/EnterGuestInfo";
import Footer from "../components/nav/Footer";
import { useEffect, useState } from "react";
import IConfirmedGuest from "../types/IConfirmedGuest";
import { ironOptions } from "../lib/ironConfig";
import { withIronSessionSsr } from "iron-session/next";
import { server } from "../lib/serverConfig";
import getSessionLanguage from "../services/language/getSessionLanguage";
import SavedDetailsComponent from "../components/guest/SavedDetailsComponent";
import {IGuestInputContent} from "../resource/guestInputContent";
import { getGuestInputContent } from "../services/dbTxn/getGuestInputContent";
import { GuestInputContent } from '@prisma/client'
type Props = {
  user: GuestTemplate;
  sessionUser: any;
  savedConfirmation?: IConfirmedGuest;
  guestInputContent: IGuestInputContent;
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...context }) {
    const sessionUser: any = req.session.user;
    if (
      sessionUser?.isAdmin !== true &&
      (sessionUser?.isLoggedIn === false ||
        sessionUser?.id !== context.query.id)
    ) {
      return { notFound: true };
    }
    const serverSideGuestTemplateData = await fetch(
      `${server}/api/${context.query.id}`
    );
    const user = await serverSideGuestTemplateData.json();
    const serverSideGuestConfirmationData = await fetch(
      `${server}/api/confirmedguest/${context.query.id}`
    );
    const savedConfirmation = await serverSideGuestConfirmationData.json();
    const dbContent = await getGuestInputContent();
    const guestInputContent: IGuestInputContent = {}
    dbContent.forEach((item: GuestInputContent)=>{
      const key = item.title as keyof typeof guestInputContent
      guestInputContent[key] = item.content
    })
  
    return { props: { user, sessionUser, savedConfirmation, guestInputContent } };
  },
  ironOptions
);
const GuestPage: NextPage<Props> = ({
  user,
  sessionUser,
  savedConfirmation,
  guestInputContent
}: Props) => {
  const router = useRouter();
  const [hasConfirmed, setHasConfirmed] = useState(savedConfirmation !== null);
  const [confirmedGuest, setConfirmedGuest] = useState<IConfirmedGuest>({
    invitedToItaly: user.isInvitedToItaly,
    invitedToUSA: user.isInvitedToUSA,
    id: user.id,
    firstName: user.name,
    plusOneFirstName: user.plusOneName || undefined,
  });
  const [language, setLanguage] = useState(0);
  useEffect(() => {
    setLanguage(getSessionLanguage());
  }, []);

  return (
    <Box position="relative" minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        px={3}
        pb={{ base: "6rem", md: "4.5rem" }}
      >
        <EnterGuestInfo
          language={language}
          user={user}
          confirmedGuest={confirmedGuest}
          setConfirmedGuest={setConfirmedGuest}
          guestInputContent={guestInputContent}
        />
        {!hasConfirmed && <Text mb={5}>no saved data</Text>}
        {hasConfirmed && (
          <SavedDetailsComponent
            savedConfirmation={savedConfirmation}
            confirmedGuest={confirmedGuest}
            language={language}
            guestInputContent={guestInputContent}
          />
        )}
      </Flex>
      <Footer
        isLoggedIn={sessionUser.isLoggedIn}
        language={language}
        setLanguage={setLanguage}
      />
    </Box>
  );
};
export default GuestPage;
