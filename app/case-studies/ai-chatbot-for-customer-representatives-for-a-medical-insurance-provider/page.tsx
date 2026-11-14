import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/ai-chatbot-for-customer-representatives-for-a-medical-insurance-provider";

export const metadata = flowMetadata(KEY, "/case-studies/ai-chatbot-for-customer-representatives-for-a-medical-insurance-provider");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
