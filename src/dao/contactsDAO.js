class contactsDAO {
    // métodos para CRUD
    // READ
    static async getUsers(client) {
        const cursor = await client
        .find()
        .project({})
        .sort({nome:1})
        .limit(10)
        try {
            const results = await cursor.toArray()
            return results
        } catch(err) {
            console.log(err)
        }
    }
    // READ (single user)
    static async getUserById(client, oid) {
        const result = await client
        .findOne(oid)
        try {
            return result
        } catch(err) {
            console.log(err)
        }
    }
    // CREATE
    static async insertUser(client, doc) {
        const ok = await client
        .insertOne(doc)
        try {
            return ok
        } catch(err) {
            console.log(err)
        }
    }
    // DELETE
    static async deleteUserByNome(client, nome_) {
        const ok = await client
        .deleteOne({nome: nome_})
        try {
            return ok
        } catch(err) {
            console.log(err)
        }
    }

    // UPDATE
    static async updateTelefoneByEmail(client, olde, tel) {
        const docs = await client
        .updateOne(olde, tel)
        try {
            return docs
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = contactsDAO