import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/mro-spare-parts-deduplication-for-a-multinational-chemical-manufacturer";

export const metadata = flowMetadata(KEY, "/case-studies/mro-spare-parts-deduplication-for-a-multinational-chemical-manufacturer");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
