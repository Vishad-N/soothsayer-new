import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/ai-driven-demand-and-price-prediction-for-raw-materials-for-a-global-chemical-manufacturer";

export const metadata = flowMetadata(KEY, "/case-studies/ai-driven-demand-and-price-prediction-for-raw-materials-for-a-global-chemical-manufacturer");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
