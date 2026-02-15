import Head from "next/head";
import { Box } from "@mantine/core";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Features } from "../components/features";
import { HowItWorks } from "../components/how-it-works";
import { CallToAction } from "../components/call-to-action";
import { Footer } from "../components/footer";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>DropTalk — Voice rooms, drop in and talk</title>
        <meta
          name="description"
          content="Create voice rooms in seconds. No account required. Share a link, talk with others in real time."
        />
      </Head>

      <Box component="main" style={{ minHeight: "100vh" }}>
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
