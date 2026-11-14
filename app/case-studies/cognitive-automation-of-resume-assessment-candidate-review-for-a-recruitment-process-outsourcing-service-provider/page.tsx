import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/cognitive-automation-of-resume-assessment-candidate-review-for-a-recruitment-process-outsourcing-service-provider";

export const metadata = flowMetadata(KEY, "/case-studies/cognitive-automation-of-resume-assessment-candidate-review-for-a-recruitment-process-outsourcing-service-provider");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
