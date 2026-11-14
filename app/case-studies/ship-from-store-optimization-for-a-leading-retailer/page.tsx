import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/ship-from-store-optimization-for-a-leading-retailer";

export const metadata = flowMetadata(KEY, "/case-studies/ship-from-store-optimization-for-a-leading-retailer");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
