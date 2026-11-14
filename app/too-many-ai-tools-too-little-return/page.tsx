import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "too-many-ai-tools-too-little-return";

export const metadata = flowMetadata(KEY, "/too-many-ai-tools-too-little-return");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
