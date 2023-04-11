import Image from "next/image";
import Link from "next/link";
import React from "react";
import EditButton from "./EditButton";

export default function BlackSection({ post, category }) {
  return (
    <div className="min-h-[30vh] flex py-3 flex-wrap lg:flex-nowrap justify-center gap-2 container m-auto">
      {post
        .map((post) => {
          return (
            <div className="w-full md:w-[300px] p-5 lg:p-0" key={post.post_id}>
              <div className="relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  height={330}
                  width={300}
                  className="w-full min-h-[230px] rounded-t-lg"
                />
                <EditButton
                  post_id={post.post_id}
                  post={post}
                  category={category}
                />
              </div>
              <Link href={`/post/${post.slug}`}>
                <div className="flex flex-col ">
                  <h1 className="font-bold text-md">{post.title}</h1>
                  <h1 className="text-xs font-semibold text-gray-600 ">
                    {post.category_name}
                  </h1>
                </div>
              </Link>
            </div>
          );
        })
        .slice(0, 5)}
    </div>
  );
}
