import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/demand-forecasting-for-a-large-distributor-of-school-meals";

export const metadata = flowMetadata(KEY, "/case-studies/demand-forecasting-for-a-large-distributor-of-school-meals");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
