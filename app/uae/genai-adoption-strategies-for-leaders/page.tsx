import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "uae/genai-adoption-strategies-for-leaders";

export const metadata = flowMetadata(KEY, "/uae/genai-adoption-strategies-for-leaders");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
