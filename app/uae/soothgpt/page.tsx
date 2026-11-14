import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "uae/soothgpt";

export const metadata = flowMetadata(KEY, "/uae/soothgpt");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
