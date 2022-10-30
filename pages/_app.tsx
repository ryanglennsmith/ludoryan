import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "../theme/index";
import "@fontsource/poppins";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../components/nav/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any, { shallow }: any) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
      console.log(`isLoading: ${isLoading}`);
    });

    router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
      console.log(`isLoading: ${isLoading}`);
    });

    router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
      console.log(`isLoading: ${isLoading}`);
    });
  }, [router]);
  return (
    <ChakraProvider theme={Theme}>
      {isLoading && <Loader />}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
