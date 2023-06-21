import {
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GuestTemplate } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {IGuestInputContent} from "../../resource/guestInputContent";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { TbCheese } from "react-icons/tb";
import { FaCar, FaCarrot, FaFish } from "react-icons/fa";

type Props = {
  user: GuestTemplate;
  openDiet: boolean;
  setOpenDiet: Function;
  openPlusOneDiet: boolean;
  setOpenPlusOneDiet: Function;
  confirmedGuest: IConfirmedGuest;
  setConfirmedGuest: Function;
  language: number;
  guestInputContent: IGuestInputContent;
};

const DietComponent = ({
  user,
  openDiet,
  setOpenDiet,
  openPlusOneDiet,
  setOpenPlusOneDiet,
  confirmedGuest,
  setConfirmedGuest,
  language,
  guestInputContent
}: Props) => {
  const [isVeganBtn, setIsVeganBtn] = useState(false);
  const [isPlusOneVeganBtn, setIsPlusOneVeganBtn] = useState(false);
  const [isVegetarianBtn, setIsVegetarianBtn] = useState(false);
  const [isPlusOneVegetarianBtn, setIsPlusOneVegetarianBtn] = useState(false);
  const [isPescatarianBtn, setIsPescatarianBtn] = useState(false);
  const [isPlusOnePescatarianBtn, setIsPlusOnePescatarianBtn] = useState(false);

  useEffect(() => {
    if (!isPescatarianBtn && !isVeganBtn && !isVegetarianBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        dietaryRestrictions: undefined,
      });
    }

    if (
      !isPlusOnePescatarianBtn &&
      !isPlusOneVeganBtn &&
      !isPlusOneVegetarianBtn
    ) {
      setConfirmedGuest({
        ...confirmedGuest,
        plusOneDietaryRestrictions: undefined,
      });
    }

    if (isPescatarianBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        dietaryRestrictions: "pescatarian",
      });
    }

    if (isVeganBtn) {
      setConfirmedGuest({ ...confirmedGuest, dietaryRestrictions: "vegan" });
    }

    if (isVegetarianBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        dietaryRestrictions: "vegatarian",
      });
    }

    if (isPlusOnePescatarianBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        plusOneDietaryRestrictions: "pescatarian",
      });
    }

    if (isPlusOneVeganBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        plusOneDietaryRestrictions: "vegan",
      });
    }

    if (isPlusOneVegetarianBtn) {
      setConfirmedGuest({
        ...confirmedGuest,
        plusOneDietaryRestrictions: "vegetarian",
      });
    }
  }, [
    isPescatarianBtn,
    isVeganBtn,
    isVegetarianBtn,
    isPlusOnePescatarianBtn,
    isPlusOneVeganBtn,
    isPlusOneVegetarianBtn,
  ]);

  return (
    <>
      <Heading size="md" mb={3} textAlign="center">
        {confirmedGuest.firstName}{" "}
        {language === 1
          ? `${guestInputContent.hasDietaryRequirementsItalian}?`
          : `${guestInputContent.hasDietaryRequirementsEnglish}?`}
      </Heading>
      <Stack spacing={5} direction="row" mb={3}>
        <Button
          colorScheme={openDiet ? "teal" : undefined}
          onClick={() => setOpenDiet(true)}
        >
          {language === 1
            ? guestInputContent.yesItalian
            : guestInputContent.yesEnglish}
        </Button>
        <Button
          colorScheme={!openDiet ? "teal" : undefined}
          onClick={() => {
            setOpenDiet(false);
            setIsPescatarianBtn(false);
            setIsVeganBtn(false);
            setIsVegetarianBtn(false);
            setConfirmedGuest({
              ...confirmedGuest,
              dietaryRestrictions: undefined,
            });
          }}
        >
          no
        </Button>
      </Stack>
      {openDiet && (
        <>
          <Stack spacing={5} mb={3} direction={{ base: "column", md: "row" }}>
            {!openDiet && (
              <Button disabled={true} size="lg">
                <Icon as={FaFish} />
              </Button>
            )}
            {!isPescatarianBtn && openDiet && (
              <Button
                size="lg"
                onClick={() => {
                  setIsPescatarianBtn(!isPescatarianBtn);
                  setIsVeganBtn(false);
                  setIsVegetarianBtn(false);
                }}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.pescatarianItalian
                    : guestInputContent.pescatarianEnglish}
                  <br />
                  <Icon as={FaFish} />
                </Text>
              </Button>
            )}
            {isPescatarianBtn && openDiet && (
              <Button
                size="lg"
                colorScheme="teal"
                onClick={() => setIsPescatarianBtn(!isPescatarianBtn)}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.pescatarianItalian
                    : guestInputContent.pescatarianEnglish}
                  <br />
                  <Icon as={FaFish} />
                </Text>
              </Button>
            )}
            {!openDiet && (
              <Button size="lg" disabled={true}>
                <Icon as={FaCarrot} />
              </Button>
            )}
            {!isVeganBtn && openDiet && (
              <Button
                size="lg"
                onClick={() => {
                  setIsVeganBtn(!isVeganBtn);
                  setIsPescatarianBtn(false);
                  setIsVegetarianBtn(false);
                }}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.veganItalian
                    : guestInputContent.veganEnglish}
                  <br />
                  <Icon as={FaCarrot} />
                </Text>
              </Button>
            )}
            {isVeganBtn && openDiet && (
              <Button
                size="lg"
                colorScheme="teal"
                onClick={() => setIsVeganBtn(!isVeganBtn)}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.veganItalian
                    : guestInputContent.veganEnglish}
                  <br />
                  <Icon as={FaCarrot} />
                </Text>
              </Button>
            )}
            {!openDiet && (
              <Button size="lg" disabled={true}>
                <Icon as={TbCheese} />
              </Button>
            )}
            {!isVegetarianBtn && openDiet && (
              <Button
                size="lg"
                onClick={() => {
                  setIsVegetarianBtn(!isVegetarianBtn);
                  setIsVeganBtn(false);
                  setIsPescatarianBtn(false);
                }}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.vegetarianItalian
                    : guestInputContent.vegetarianEnglish}
                  <br />
                  <Icon as={TbCheese} />
                </Text>
              </Button>
            )}
            {isVegetarianBtn && openDiet && (
              <Button
                size="lg"
                colorScheme="teal"
                onClick={() => setIsVegetarianBtn(!isVegetarianBtn)}
              >
                <Text>
                  {language === 1
                    ? guestInputContent.vegetarianItalian
                    : guestInputContent.vegetarianEnglish}
                  <br />
                  <Icon as={TbCheese} />
                </Text>
              </Button>
            )}
          </Stack>
          <InputGroup
            size="md"
            mb={3}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Heading size="sm" m={3}>
              {language === 1
                ? guestInputContent.specialRequirementsItalian
                : guestInputContent.specialRequirementsEnglish}
              :
            </Heading>
            <Input
              disabled={openDiet ? false : true}
              placeholder={`${confirmedGuest.firstName}: ${
                language === 1
                  ? guestInputContent.specialRequirementsItalian
                  : guestInputContent.specialRequirementsEnglish
              }`}
              value={confirmedGuest.dietaryRestrictions || ""}
              variant="filled"
              m={2}
              mb={3}
              onChange={(e) =>
                setConfirmedGuest({
                  ...confirmedGuest,
                  dietaryRestrictions: e.target.value,
                })
              }
            ></Input>
          </InputGroup>
        </>
      )}

      {confirmedGuest.plusOneFirstName && (
        <>
          <Heading size="md" mb={3} textAlign="center">
            {confirmedGuest.plusOneFirstName}{" "}
            {language === 1
              ? `${guestInputContent.hasDietaryRequirementsItalian}?`
              : `${guestInputContent.hasDietaryRequirementsEnglish}?`}
          </Heading>
          <Stack spacing={5} direction="row" mb={3}>
            <Button
              colorScheme={openPlusOneDiet ? "teal" : undefined}
              onClick={() => setOpenPlusOneDiet(true)}
            >
              {language === 1
                ? guestInputContent.yesItalian
                : guestInputContent.yesEnglish}
            </Button>
            <Button
              colorScheme={!openPlusOneDiet ? "teal" : undefined}
              onClick={() => {
                setIsPlusOnePescatarianBtn(false);
                setIsPlusOneVeganBtn(false);
                setIsPlusOneVegetarianBtn(false);
                setOpenPlusOneDiet(false);
                setConfirmedGuest({
                  ...confirmedGuest,
                  plusOneDietaryRestrictions: undefined,
                });
              }}
            >
              no
            </Button>
          </Stack>
          {openPlusOneDiet && (
            <>
              <Stack
                spacing={5}
                mb={3}
                direction={{ base: "column", md: "row" }}
              >
                {!openPlusOneDiet && (
                  <Button disabled={true} size="lg">
                    <Icon as={FaFish} />
                  </Button>
                )}
                {!isPlusOnePescatarianBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsPlusOneVeganBtn(false);
                      setIsPlusOneVegetarianBtn(false);
                      setIsPlusOnePescatarianBtn(!isPlusOnePescatarianBtn);
                    }}
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.pescatarianItalian
                        : guestInputContent.pescatarianEnglish}
                      <br />
                      <Icon as={FaFish} />
                    </Text>
                  </Button>
                )}
                {isPlusOnePescatarianBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    colorScheme="teal"
                    onClick={() =>
                      setIsPlusOnePescatarianBtn(!isPlusOnePescatarianBtn)
                    }
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.pescatarianItalian
                        : guestInputContent.pescatarianEnglish}
                      <br />
                      <Icon as={FaFish} />
                    </Text>
                  </Button>
                )}
                {!openPlusOneDiet && (
                  <Button size="lg" disabled={true}>
                    <Icon as={FaCarrot} />
                  </Button>
                )}
                {!isPlusOneVeganBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsPlusOnePescatarianBtn(false);
                      setIsPlusOneVegetarianBtn(false);
                      setIsPlusOneVeganBtn(!isPlusOneVeganBtn);
                    }}
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.veganItalian
                        : guestInputContent.veganEnglish}
                      <br />
                      <Icon as={FaCarrot} />
                    </Text>
                  </Button>
                )}
                {isPlusOneVeganBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    colorScheme="teal"
                    onClick={() => setIsPlusOneVeganBtn(!isPlusOneVeganBtn)}
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.veganItalian
                        : guestInputContent.veganEnglish}
                      <br />
                      <Icon as={FaCarrot} />
                    </Text>
                  </Button>
                )}
                {!openPlusOneDiet && (
                  <Button size="lg" disabled={true}>
                    <Icon as={TbCheese} />
                  </Button>
                )}
                {!isPlusOneVegetarianBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsPlusOnePescatarianBtn(false);
                      setIsPlusOneVeganBtn(false);
                      setIsPlusOneVegetarianBtn(!isPlusOneVegetarianBtn);
                    }}
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.vegetarianItalian
                        : guestInputContent.vegetarianEnglish}
                      <br />
                      <Icon as={TbCheese} />
                    </Text>
                  </Button>
                )}
                {isPlusOneVegetarianBtn && openPlusOneDiet && (
                  <Button
                    size="lg"
                    colorScheme="teal"
                    onClick={() =>
                      setIsPlusOneVegetarianBtn(!isPlusOneVegetarianBtn)
                    }
                  >
                    <Text>
                      {language === 1
                        ? guestInputContent.vegetarianItalian
                        : guestInputContent.vegetarianEnglish}
                      <br />
                      <Icon as={TbCheese} />
                    </Text>
                  </Button>
                )}
              </Stack>
              <InputGroup
                size="md"
                mb={3}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Heading size="sm" m={3}>
                  {language === 1
                    ? guestInputContent.specialRequirementsItalian
                    : guestInputContent.specialRequirementsEnglish}
                  :
                </Heading>
                <Input
                  placeholder={`${confirmedGuest.plusOneFirstName}: ${
                    language === 1
                      ? guestInputContent.specialRequirementsItalian
                      : guestInputContent.specialRequirementsEnglish
                  }`}
                  value={confirmedGuest.plusOneDietaryRestrictions || ""}
                  variant="filled"
                  disabled={openPlusOneDiet ? false : true}
                  m={2}
                  mb={3}
                  onChange={(e) =>
                    setConfirmedGuest({
                      ...confirmedGuest,
                      plusOneDietaryRestrictions: e.target.value,
                    })
                  }
                ></Input>
              </InputGroup>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DietComponent;
