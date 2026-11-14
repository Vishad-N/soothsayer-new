import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "ai-in-procurement";

export const metadata = flowMetadata(KEY, "/ai-in-procurement");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
