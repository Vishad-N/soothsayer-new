import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "genai-adoption-strategies-for-leaders";

export const metadata = flowMetadata(KEY, "/genai-adoption-strategies-for-leaders");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
