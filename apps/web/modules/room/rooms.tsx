import { useSocketQuery } from "../../hooks/use-socket-query";
import { Center, Loader, Box, Text } from "@mantine/core";
import { RoomCard } from "./room-card";
import { Alert } from "../../components/alert";
import { useSocket } from "../socket/socket-provider";

export const Rooms = () => {
  const { state } = useSocket();
  const { data, isFetching, isError } = useSocketQuery("rooms");

  if (state === "connecting")
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );

  if (state !== "connected")
    return (
      <Alert
        type="error"
        message="web server is down"
        style={{ marginTop: 20 }}
      />
    );

  if (isFetching)
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );

  if (isError)
    return (
      <Alert
        type="error"
        message="failed to fetch rooms"
        style={{ marginTop: 20 }}
      />
    );

  if (data)
    return (
      <>
        {data.rooms.length === 0 ? (
          <Box py="xl" ta="center">
            <Text c="dimmed">No rooms yet. Create one to get started.</Text>
          </Box>
        ) : (
          <>
            {data.rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </>
        )}
      </>
    );

  // if (data)
  //   return (
  //     <ScrollArea
  //       type="auto"
  //       offsetScrollbars
  //       // style={{ flex: 1, minHeight: 0 }}
  //       styles={{
  //         // root: { flex: 1, minHeight: 0 },
  //         // viewport: { minHeight: 0 },
  //         thumb: { backgroundColor: "var(--color-primary)" }
  //       }}
  //     >
  //       <Stack gap="sm">
  //         {data.rooms.length === 0 ? (
  //           <Box py="xl" ta="center">
  //             <Text c="dimmed">No rooms yet. Create one to get started.</Text>
  //           </Box>
  //         ) : (
  //           data.rooms.map((room) => <RoomCard key={room._id} room={room} />)
  //         )}
  //       </Stack>
  //     </ScrollArea>
  //   );

  return null;
};
