import { GoogleOAuthProvider } from "@react-oauth/google";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
import Layout from "../components/layout/Layout";
import { GTM_ID, pageview } from "../lib/gtm";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
import { HydrationProvider, Server, Client } from "react-hydration-provider";
import { Suspense } from "react";

const gtag = dynamic(
  () => {
    return import("../lib/gtag");
  },
  { ssr: false }
);
const Schema = dynamic(
  () => {
    return import("../components/Schema");
  },
  { ssr: false }
);
const LoadingSpinner = dynamic(
  () => {
    return import("../components/layout/LoadingSpinner");
  },
  { ssr: false }
);
function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end, handleRouteChange, pageview);
    router.events.on("routeChangeError", end);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off(
        "routeChangeComplete",
        end,
        handleRouteChange,
        pageview
      );
      router.events.off("routeChangeError", end);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>

      <meta name="robots" content="index, follow" />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Ostello" />
      <main
        onClick={(e) => {
          if (e.target.tagName === "A") {
            e.preventDefault();
            router.push(e.target.href);
          }
        }}
      >
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          {loading ? (
            <LoadingSpinner />
          ) : process.browser ? (
            <PersistGate persistor={store.__persistor}>
              {() => (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </PersistGate>
          ) : (
            <PersistGate persistor={store}>
              {() => (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </PersistGate>
          )}
        </GoogleOAuthProvider>
      </main>
    </>
  );
}

export default wrapper.withRedux(MyApp);
