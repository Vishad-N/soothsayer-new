import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "uae/procurement";

export const metadata = flowMetadata(KEY, "/uae/procurement");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
