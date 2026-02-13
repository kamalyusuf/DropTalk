import type { GetServerSideProps } from "next";

const Redirect = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: "/app/rooms", permanent: true } };
};

export default Redirect;
