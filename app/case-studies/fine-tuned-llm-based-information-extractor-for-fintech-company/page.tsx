import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/fine-tuned-llm-based-information-extractor-for-fintech-company";

export const metadata = flowMetadata(KEY, "/case-studies/fine-tuned-llm-based-information-extractor-for-fintech-company");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
