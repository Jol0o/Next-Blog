import Section from '../components/Section';

export default function Home({ post, category }) {
  return (
    <>
      <Section post={post} category={category} />
    </>
  )
}

export async function getStaticProps(context) {
  try {
    const [postRes, categoryRes] = await Promise.all([
      fetch('http://localhost:3000/api/post'),
      fetch('http://localhost:3000/api/category'),
    ]);
    const [post, category] = await Promise.all([
      postRes.json(),
      categoryRes.json(),
    ]);
    return {
      props: { post, category },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { post, category },
    };
  }
}
