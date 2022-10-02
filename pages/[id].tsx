import { Box, Flex } from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import EnterGuestInfo from "../components/guest/EnterGuestInfo";
import Footer from "../components/nav/Footer";
import { useState } from "react";
import type Kids from "../types/Kids";
import type Rsvp from "../types/Rsvp";

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

  const [rsvp, setRsvp] = useState<Rsvp>({ italy: false, usa: false });
  const [milanBus, setMilanBus] = useState(false);
  const [kids, setKids] = useState<Kids>({
    italy: 0,
    usa: 0,
  });
  console.log(rsvp);
  console.log(kids);
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
            rsvp={rsvp}
            setRsvp={setRsvp}
            milanBus={milanBus}
            setMilanBus={setMilanBus}
            kids={kids}
            setKids={setKids}
          />
        </Flex>
        <Footer />
      </Box>
    </>
  );
};
export default GuestPage;
