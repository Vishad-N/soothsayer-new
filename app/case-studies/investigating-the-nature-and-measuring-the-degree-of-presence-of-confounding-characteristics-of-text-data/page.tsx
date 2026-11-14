import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "case-studies/investigating-the-nature-and-measuring-the-degree-of-presence-of-confounding-characteristics-of-text-data";

export const metadata = flowMetadata(KEY, "/case-studies/investigating-the-nature-and-measuring-the-degree-of-presence-of-confounding-characteristics-of-text-data");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
