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
type Props = {
  user: GuestTemplate;
  sessionUser: any;
  savedConfirmation?: IConfirmedGuest;
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
    return { props: { user, sessionUser, savedConfirmation } };
  },
  ironOptions
);
const GuestPage: NextPage<Props> = ({
  user,
  sessionUser,
  savedConfirmation,
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
    const getSessionLanguage = (): number => {
      if (sessionStorage.getItem("language") !== undefined) {
        return Number(sessionStorage.getItem("language"));
      } else {
        return 0;
      }
    };
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
        />
        {!hasConfirmed && <Text mb={5}>no saved data</Text>}
        {hasConfirmed && (
          <Flex alignItems="left" direction="column" mb={5}>
            <Heading size="sm" my={3}>
              saved details
            </Heading>
            <ul>first name: {savedConfirmation?.firstName || "none"}</ul>
            <ul>last name: {savedConfirmation?.lastName || "none"}</ul>
            <ul>
              partner's first name:{" "}
              {savedConfirmation?.plusOneFirstName || "none"}
            </ul>
            <ul>
              partner's last name:{" "}
              {savedConfirmation?.plusOneLastName || "none"}
            </ul>
            <ul>
              {confirmedGuest.invitedToItaly && (
                <>
                  rsvp to italy:{" "}
                  {savedConfirmation?.confirmedItaly ? "yes" : "no"}
                </>
              )}
            </ul>
            <ul>
              {confirmedGuest.invitedToUSA && (
                <>
                  rsvp to usa: {savedConfirmation?.confirmedUsa ? "yes" : "no"}
                </>
              )}
            </ul>
            <ul>
              {confirmedGuest.invitedToItaly &&
                savedConfirmation?.confirmedItaly && (
                  <>
                    bringing children to italy:{" "}
                    {savedConfirmation?.italyKids?.toString() || "0"}
                  </>
                )}
            </ul>
            <ul>
              {confirmedGuest.invitedToUSA &&
                savedConfirmation?.confirmedUsa && (
                  <>
                    bringing children to usa:{" "}
                    {savedConfirmation?.usaKids?.toString() || "0"}
                  </>
                )}
            </ul>
            <ul>
              {confirmedGuest.invitedToItaly &&
                savedConfirmation?.confirmedItaly && (
                  <>
                    transport to venue in milan:{" "}
                    {savedConfirmation?.italyBus
                      ? "riding the bus"
                      : "driving myself"}
                  </>
                )}
            </ul>
            <ul>
              {(savedConfirmation?.confirmedItaly ||
                savedConfirmation?.confirmedUsa) && (
                <>
                  dietary restrictions:{" "}
                  {savedConfirmation.dietaryRestrictions || "none"}
                </>
              )}
            </ul>
            <ul>
              {(savedConfirmation?.confirmedItaly ||
                savedConfirmation?.confirmedUsa) && (
                <>
                  my partner's dietary restrictions:{" "}
                  {savedConfirmation.plusOneDietaryRestrictions || "none"}
                </>
              )}
            </ul>
          </Flex>
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
