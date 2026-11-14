import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/taking-action-to-reduce-incurred-claims-handling-costs-for-a-major-insurance-co";

export const metadata = flowMetadata(KEY, "/case-studies/taking-action-to-reduce-incurred-claims-handling-costs-for-a-major-insurance-co");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
