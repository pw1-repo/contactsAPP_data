class contactsDAO {
    // métodos para CRUD
    // READ (all contacts)
    static async getContacts(client) {
        try {
            const cursor = await client
            .find()
            .project()
            .sort({ nome: 1 })
            //.limit(10)
            const results = await cursor.toArray()
            return results
        } catch (err) {
            console.log(err)
        }
    }
    // READ (favorite contacts)
    static async getFavoriteContacts(client) {
        try {
            const cursor = await client
            .find({ favorito: true })
            .project()
            .sort({ nome: 1 })
            const results = await cursor.toArray()
            return results
        } catch (err) {
            console.log(err)
        }
    }
    // READ (single contact)
    static async getContactById(client, id_) {
        try {
            const options = {
                projection: {},
                sort: {}
            }
            const cursor = await client
                .findOne({ _id: id_ }, options)

            const result = await cursor
            if (!result) {
                return { error: "Contato não encontrado" }
            } else {
                return result
            }
        } catch (err) {
            console.log(err)
        }
    }
    // CREATE
    static async insertContact(client, doc) {
        try {
            const ok = await client.insertOne(doc)
            if (ok.insertedId === null) {
                return { error: "Erro ao inserir usuário" }
            } else {
                return ok
            }
        } catch (err) {
            console.log(err)
        }
    }
    // DELETE
    static async deleteContactByNome(client, nome_) {
        try {
            const ok = await client.deleteOne({ nome: nome_ })
            if (ok.deletedCount === 0) {
                return { error: "Erro ao deletar usuário" }
            } else {
                return ok
            }
        } catch (err) {
            console.log(err)
        }
    }

    // UPDATE
    static async updateTelefoneByEmail(client, email_, tel_) {
        try {
            const docs = await client
                .updateOne(
                    { email: email_ },
                    { $set: { telefone: tel_ } }
                )
            if (docs.modifiedCount === 0) {
                return { error: "Erro ao atualizar telefone" }
            } else {
                return docs
            }
        } catch (err) {
            console.log(err)
        }
    }

    // UPDATE ALTERNATIVE
    static async updateTelefoneByEmail_v2(client, email_, tel_) {
        try {
            const doc = await client
                .findOneAndUpdate(
                    { email: email_ },
                    { $set: { telefone: tel_ } },
                    { returnNewDocument: true }
                )
            if (!doc) {
                return { error: "Erro ao atualizar telefone" }
            } else {
                return doc
            }

        } catch (err) {
            console.log(err)
        }
    }
    // TOGGLE FAVORITE
    static async toggleFavoritoByNome(client, nome_) {
        try {
            const doc = await client
                .findOneAndUpdate(
                    { nome: nome_ },
                    [
                        { $set: { favorito: { $not: "$favorito" } } }
                    ],
                    { returnNewDocument: true }
                )
            if (!doc) {
                return { error: "Erro ao atualizar favorito" }
            } else {
                return doc
            }
        } catch (err) {
            console.log(err)
        }
    }
    // MODIFY
    static async modifyContactById(client, id_, doc) {
        try {
            const options = {
                returnNewDocument: true
            }
            const result = await client
                .findOneAndReplace(
                    { _id: id_ },
                    doc,
                    options
                )
            if (!result) {
                return { error: "Erro ao modificar contato" }
            } else {
                return result
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = contactsDAO