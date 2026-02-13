import { Alert } from "../../components/alert";
import { useRoomStore } from "../../store/room";

export const RoomError = () => {
  const error = useRoomStore((state) => state.error);

  const deviceerror = error === "already loaded";
  const micerror = error === "Permission denied";
  const devicemissingerror = error === "Requested device not found";

  return (
    <Alert
      type="error"
      message={
        deviceerror
          ? "Please refresh the page"
          : micerror
            ? "Microphone access is denied"
            : devicemissingerror
              ? "No microphone(s) detected"
              : (error ?? "Could not join room")
      }
      wrap
    />
  );
};
