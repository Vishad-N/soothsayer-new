import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/enterprise-chatgpt-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors";

export const metadata = flowMetadata(KEY, "/case-studies/enterprise-chatgpt-for-largest-system-supplier-for-food-beverage-and-pharmaceutical-sectors");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
