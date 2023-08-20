import { NextPage } from "next";
import Footer from "../components/nav/Footer";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
const Gallery: NextPage = ({}) => {
    const [language, setLanguage] = useState<number>(0);
    return <Box position="relative" minH="100vh">
                <Footer isLoggedIn={false} language={language} setLanguage={setLanguage}/>
        </Box>
}

export default Gallery