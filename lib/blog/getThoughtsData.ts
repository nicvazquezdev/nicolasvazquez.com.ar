import { getAllPosts } from "./blog";
import { InfoItem } from "@/types";

export function getThoughtsData(): InfoItem {
  const posts = getAllPosts();

  return {
    title: "thoughts",
    links: posts.map((post) => ({
      url: `/thoughts/${post.slug}`,
      name: post.title,
      date: post.date,
    })),
  };
}
