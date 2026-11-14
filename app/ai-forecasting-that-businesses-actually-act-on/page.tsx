import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "ai-forecasting-that-businesses-actually-act-on";

export const metadata = flowMetadata(KEY, "/ai-forecasting-that-businesses-actually-act-on");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
