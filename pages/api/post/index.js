import openDb from '../../../sqlite/sql'
import slugify from 'slugify';

export default async function getPosts(req, res) {
    const db = await openDb();
    if (req.method === 'GET') {
        const allPosts = await db.all('Select * FROM post ORDER BY created_at desc')
        res.json(allPosts)
    } else if (req.method === 'POST') {
        const createPost = await db.prepare(
            "INSERT INTO post (title,slug,imageUrl,excerpt,content,author,featured,created_at,category_name) VALUES (?,?,?,?,?,?,?,datetime('now','localtime'),?)"
        ); try {
            const response = await createPost.run(
                req.body.title,
                (req.body.slug = slugify(req.body.title)),
                req.body.imageUrl,
                req.body.excerpt,
                req.body.content,
                req.body.author,
                req.body.featured,
                req.body.category_name
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Created')
        }
    } else if (req.method === 'PUT') {
        const updatePost = await db.prepare("UPDATE post set title = ?,slug = ?,imageUrl = ?,excerpt = ?,content = ?,author = ?,category_name = ? where post_id = ?")
        try {
            const response = await updatePost.run(
                req.body.title,
                (req.body.slug = slugify(req.body.title)),
                req.body.imageUrl,
                req.body.excerpt,
                req.body.content,
                req.body.author,
                req.body.category_name,
                req.body.post_id
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Updated')
        }
    } else if (req.method === 'DELETE') {
        const deletePost = await db.prepare("DELETE FROM post where post_id = ?")
        try {
            const response = await deletePost.run(
                req.body.post_id
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Deleted')
        }
    } else {
        res.json("No Data Found")
    }
}