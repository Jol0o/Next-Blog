import axios from "axios";
import Section from '../components/Section';

export default function Home({ post, category }) {
  return (
    <>
      <Section post={post} category={category} />
    </>
  )
}

export async function getStaticProps(context) {
  const postRes = await axios.get('http://localhost:3000/api/post');
  const post = await postRes.data;
  const categoryRes = await axios.get('http://localhost:3000/api/category');
  const category = await categoryRes.data;
  return {
    props: { post, category }, // will be passed to the page component as props
  }
}
