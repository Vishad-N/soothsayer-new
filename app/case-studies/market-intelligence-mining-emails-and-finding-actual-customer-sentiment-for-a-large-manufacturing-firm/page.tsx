import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/market-intelligence-mining-emails-and-finding-actual-customer-sentiment-for-a-large-manufacturing-firm";

export const metadata = flowMetadata(KEY, "/case-studies/market-intelligence-mining-emails-and-finding-actual-customer-sentiment-for-a-large-manufacturing-firm");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
