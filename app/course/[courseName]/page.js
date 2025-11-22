import LiveEditor from "@/app/_components/LiveEditor";

export default async function EditorPage({ params }) {
  const { courseName } = await params;

  return <LiveEditor courseName={courseName} />;
}