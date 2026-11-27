import { useVideoPlayer, VideoView } from "expo-video";
import { styles } from "./theme";

export function Player({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (instance) => {
    instance.play();
  });
  return <VideoView player={player} style={styles.player} nativeControls contentFit="contain" />;
}
