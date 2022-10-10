import { Box, Flex } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import EnterGuestInfo from "../components/guest/EnterGuestInfo";
import Footer from "../components/nav/Footer";
import { useEffect, useState } from "react";
import IConfirmedGuest from "../types/IConfirmedGuest";
type Props = { user: GuestTemplate };
export const getServerSideProps = async (ctx: NextPageContext) => {
  console.log(ctx.query);
  const response = await fetch(`http://localhost:3000/api/${ctx.query.id}`);
  const user = await response.json();
  return { props: { user } };
};
const GuestPage: NextPage<Props> = ({ user }: Props) => {
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
    // location: bringADate(user),
  });

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
            user={user}
            confirmedGuest={confirmedGuest}
            setConfirmedGuest={setConfirmedGuest}
          />
        </Flex>
        <Footer />
      </Box>
    </>
  );
};
export default GuestPage;
