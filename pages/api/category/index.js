import openDb from '../../../sqlite/sql'
const sqlite3 = require('sqlite3')

export default async function getCategories(req, res) {
    const db = await openDb();
    if (req.method === 'GET') {
        const allCat = await db.all('Select * FROM category')
        res.json(allCat)
    } else if (req.method === 'POST') {
        const createCategory = await db.prepare("INSERT INTO category ('category_name')VALUES(?)")
        try {
            const response = await createCategory.run(
                req.body.category_name
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Created')
        }
    } else if (req.method === 'PUT') {
        const updateCategory = await db.prepare("UPDATE category set category_name = ? where cat_id = ?")
        try {
            const response = await updateCategory.run(
                req.body.category_name, req.body.cat_id
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Updated')
        }
    } else if (req.method === 'DELETE') {
        const deleteCategory = await db.prepare("DELETE FROM category where cat_id = ?")
        try {
            const response = await deleteCategory.run(
                req.body.cat_id
            )
            await response.finalize()
        } catch (error) {
            res.json(error, 'No Data Deleted')
        }
    } else {
        res.json("no data found")
    }
}