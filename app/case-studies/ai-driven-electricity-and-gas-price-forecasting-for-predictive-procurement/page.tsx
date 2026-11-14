import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/ai-driven-electricity-and-gas-price-forecasting-for-predictive-procurement";

export const metadata = flowMetadata(KEY, "/case-studies/ai-driven-electricity-and-gas-price-forecasting-for-predictive-procurement");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
