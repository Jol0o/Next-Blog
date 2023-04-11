import React from 'react'
import Image from 'next/image';

export default function index({ post }) {
    return (
        <div className='w-full min-h-screen mt-5'>
            <div className='container m-auto'>
                <div className='flex flex-col '>
                    <div>
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            height={330}
                            width={300}
                            className="w-full lg:h-[70vh]"
                        />
                    </div>
                    <div className='self-center m-5'>
                        <h1 className='text-3xl font-bold lg:text-5xl'>{post.title}</h1>
                        <p className='mt-3 text-lg font-semibold'>{post.excerpt}</p>
                        <div className='flex mt-2 font-semibold text-gray-600 w-fit text-md'>
                            <h1>{post.category_name} | <span>{post.created_at}</span></h1>
                        </div>
                        <h1 className='mt-1 text-lg font-semibold lg:text-xl'>{post.author}</h1>
                    </div>
                </div>
                <div className='m-5 indent-8'>
                    <p className='text-lg font-semibold'>{post.content}</p>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    try {
        const res = await fetch('http://localhost:3000/api/post');
        if (res.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        const posts = await res.json();

        const paths = posts.map((post) => ({
            params: { slug: post.slug.toString() },
        }));

        return {
            paths,
            fallback: false,
            // can also be true or 'blocking'
        };
    } catch (error) {
        console.error(error);
        return {
            fallback: false,
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`http://localhost:3000/api/post/${params.slug}`);
        if (res.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        const post = await res.json();

        return {
            props: { post },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { post: [] },
        };
    }
}