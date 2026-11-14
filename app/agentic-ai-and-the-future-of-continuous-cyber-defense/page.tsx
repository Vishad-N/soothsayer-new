import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "agentic-ai-and-the-future-of-continuous-cyber-defense";

export const metadata = flowMetadata(KEY, "/agentic-ai-and-the-future-of-continuous-cyber-defense");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
