import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "architecting-ai-at-scale";

export const metadata = flowMetadata(KEY, "/architecting-ai-at-scale");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
