import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/unstructured-report-analysis-for-a-leading-chemical-manufacturer";

export const metadata = flowMetadata(KEY, "/case-studies/unstructured-report-analysis-for-a-leading-chemical-manufacturer");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
