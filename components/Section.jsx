import Image from "next/image";
import Link from "next/link";
import React from "react";
import EditButton from "./EditButton";

export default function Section({ post, category }) {
  return (
    <div className="w-full min-h-screen">
      <div className="container p-2 m-auto lg:p-0">
        <div className="flex flex-col items-center my-5 lg:flex-row lg:w-fit">
          <div className="flex flex-col gap-3 ml-2">
            <h1 className="text-5xl font-bold">{post[0].title}</h1>
            <p className="font-semibold text-md">{post[0].excerpt}</p>{" "}
            <Link href={`/post/${post[0].slug}`}>
              <p className="bg-[#576CBC] w-fit px-3 font-semibold text-md rounded-full text-[#F9F5EB]">
                Read More
              </p>
            </Link>
          </div>

          <div className="relative">
            <Image
              src={post[0].imageUrl}
              alt={post[0].title}
              height={530}
              width={1000}
              className="lg:max-w-[650px] lg:max-h-[530px] lg:h-[600px]"
            />
            <EditButton
              post_id={post[0].post_id}
              post={post}
              category={category}
            />
          </div>
        </div>
        <div className="flex flex-col my-10">
          {category
            .slice(0, 2)
            .map((category) => {
              return (
                <div key={category.cat_id} className="w-full">
                  <div className="flex justify-around my-3">
                    <h1 className="font-semibold text-black text-md">
                      {category.category_name}
                    </h1>
                    <h1 className="text-xs font-semibold text-gray-600">
                      View more
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {post
                      .filter(
                        (post) => post.category_name === category.category_name
                      )
                      .slice(0, 3)
                      .map((post) => {
                        return (
                          <div
                            className="relative text-black/90  md:p-0 w-[300px]"
                            key={post.post_id}
                          >
                            <div className="relative ">
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                height={200}
                                width={300}
                                className=" rounded-lg min-h-[200px] h-[200px]"
                              />
                              <EditButton
                                post_id={post.post_id}
                                post={post}
                                category={category}
                              />
                            </div>
                            <Link
                              href={`/post/${post.slug}`}
                              className="absolute bottom-0 w-full font-mono overflow-hidden bg-[#d8d8d873] border rounded-b-lg"
                            >
                              <div className="h-16 p-3">
                                <h1 className="overflow-hidden font-semibold text-ellipsis text-md">
                                  {post.title}
                                </h1>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })
            .slice(0, 3)}
        </div>
      </div>
    </div>
  );
}
