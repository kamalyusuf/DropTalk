import { useMediaQuery } from "@mantine/hooks";

export const useSmallLayout = () => useMediaQuery("(max-width: 1200px)");
