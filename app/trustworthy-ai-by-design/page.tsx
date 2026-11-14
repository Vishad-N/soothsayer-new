import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "trustworthy-ai-by-design";

export const metadata = flowMetadata(KEY, "/trustworthy-ai-by-design");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
