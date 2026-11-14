import { FlowPage, flowMetadata } from "@/components/flow/Flow";

const KEY = "why-ai-projects-fail-and-what-to-do-about-it";

export const metadata = flowMetadata(KEY, "/why-ai-projects-fail-and-what-to-do-about-it");

export default function Page() {
  return <FlowPage pageKey={KEY} />;
}
