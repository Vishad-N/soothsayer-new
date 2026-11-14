import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/artificial-intelligence-ai-driven-multivariate-revenue-forecasting-for-a-very-large-fiber-composites-manufacturer";

export const metadata = flowMetadata(KEY, "/case-studies/artificial-intelligence-ai-driven-multivariate-revenue-forecasting-for-a-very-large-fiber-composites-manufacturer");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
