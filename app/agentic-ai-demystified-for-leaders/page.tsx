import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "agentic-ai-demystified-for-leaders";

export const metadata = flowMetadata(KEY, "/agentic-ai-demystified-for-leaders");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
