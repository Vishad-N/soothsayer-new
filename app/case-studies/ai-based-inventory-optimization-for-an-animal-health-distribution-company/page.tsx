import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/ai-based-inventory-optimization-for-an-animal-health-distribution-company";

export const metadata = flowMetadata(KEY, "/case-studies/ai-based-inventory-optimization-for-an-animal-health-distribution-company");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
