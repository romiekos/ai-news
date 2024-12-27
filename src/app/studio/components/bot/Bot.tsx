import { Eyes } from "./Eyes";
import Mouth from "./Mouth";
import Chicks from "./Chicks";

export default function Bot({
  isTalking,
  audioNode,
}: {
  isTalking: boolean;
  audioNode: AudioNode | null;
}) {
  return (
    <div className="fixed w-1/2 h-screen left-0 flex items-center justify-center flying">
      <section className="stage">
        <figure className="ball">
          <Eyes />
          <Chicks />
          <Mouth isTalking={isTalking} audioNode={audioNode} />
        </figure>
      </section>
    </div>
  );
}
