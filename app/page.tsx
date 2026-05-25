import { Sections } from "@/components/features/info-section";
import { infoData } from "@/data";
import { getThoughtsData } from "@/lib/blog";

export default function Home() {
  const data = {
    thoughts: getThoughtsData(),
    ...infoData,
  };

  return (
    <main>
      <Sections data={data} />
    </main>
  );
}
