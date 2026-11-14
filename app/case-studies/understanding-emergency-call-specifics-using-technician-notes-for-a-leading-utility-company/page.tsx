import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/understanding-emergency-call-specifics-using-technician-notes-for-a-leading-utility-company";

export const metadata = flowMetadata(KEY, "/case-studies/understanding-emergency-call-specifics-using-technician-notes-for-a-leading-utility-company");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
