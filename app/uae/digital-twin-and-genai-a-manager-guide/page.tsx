import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "uae/digital-twin-and-genai-a-manager-guide";

export const metadata = flowMetadata(KEY, "/uae/digital-twin-and-genai-a-manager-guide");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
