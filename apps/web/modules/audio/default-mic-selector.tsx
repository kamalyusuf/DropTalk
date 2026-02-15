import { useState, useEffect } from "react";
import { useMicStore } from "../../store/mic";
import { Stack, Text, Select, Button, Loader, Center } from "@mantine/core";
import { toast } from "react-toastify";
import { useShallow } from "../../hooks/use-shallow";
import { sleep } from "../../utils/sleep";

export const DefaultMicSelector = () => {
  const [mics, setmics] = useState<{ id: string; label: string }[]>([]);
  const [enumerating, setenumerating] = useState(true);
  const { micid, setdefaultmic } = useMicStore(
    useShallow((state) => ({
      micid: state.id,
      setdefaultmic: state.setdefaultmicid
    }))
  );

  const enumerate = async (delay?: number) => {
    setenumerating(true);

    if (delay) await sleep(delay);

    try {
      const info = await navigator.mediaDevices.enumerateDevices();
      const devices = info
        .filter((device) => device.kind === "audioinput" && device.deviceId)
        .map((device) => ({ id: device.deviceId, label: device.label }));

      setmics(devices);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to retrieve devices."
      );
    } finally {
      setenumerating(false);
    }
  };

  useEffect(() => {
    enumerate();
  }, []);

  return (
    <Stack gap="sm">
      {enumerating ? (
        <Center>
          <Loader size="sm" />
        </Center>
      ) : (
        <>
          {mics.length === 0 ? (
            <Text c="red">No microphone(s) detected</Text>
          ) : (
            <Select
              label={<Text component="span">Default microphone</Text>}
              placeholder="Select"
              size="xs"
              radius="md"
              data={[
                ...mics.map((mic) => ({ value: mic.id, label: mic.label })),
                { value: "-", label: "—" }
              ]}
              value={micid}
              onChange={(value) => {
                if (!value) return;
                setdefaultmic(value);
                toast.success("Saved");
              }}
            />
          )}
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            radius="md"
            onClick={() => enumerate(250)}
          >
            Refresh list
          </Button>
        </>
      )}
    </Stack>
  );
};
