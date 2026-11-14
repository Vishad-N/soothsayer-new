import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/fake-proof-of-purchase-detection-for-a-large-auto-service-provider";

export const metadata = flowMetadata(KEY, "/case-studies/fake-proof-of-purchase-detection-for-a-large-auto-service-provider");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
