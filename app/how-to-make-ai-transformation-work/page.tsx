import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "how-to-make-ai-transformation-work";

export const metadata = flowMetadata(KEY, "/how-to-make-ai-transformation-work");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
