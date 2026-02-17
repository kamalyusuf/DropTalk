import { useMediaQuery } from "@mantine/hooks";

export const SMALL_LAYOUT = "(max-width: 1200px)";

export const useSmallLayout = () => useMediaQuery(SMALL_LAYOUT);
