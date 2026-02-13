import type { GetServerSideProps } from "next";

const Redirect = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = typeof context.params?.id === "string" ? context.params.id : "";
  return {
    redirect: { destination: `/app/rooms/${id}`, permanent: true }
  };
};

export default Redirect;
