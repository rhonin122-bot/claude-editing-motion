import { Composition } from "remotion";
import { EditingMotion } from "./Composition";

export function RemotionRoot() {
  return (
    <Composition
      id="EditingMotion"
      component={EditingMotion}
      width={1280}
      height={720}
      fps={30}
      durationInFrames={902}
    />
  );
}
