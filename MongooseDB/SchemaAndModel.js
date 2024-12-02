import mongoose, {connect} from 'mongoose';
import Connection from './Connection.js'

const { Schema } = mongoose;

const blogSchema = new Schema({
    id: Number,
    Titulo: String,
    Ano_Lancamento: String,
    Edicao: String,
    Linguagem: String
});

const blogModel = mongoose.model('Livros', blogSchema);

export async function CreateDocument(Livro) {
    try {
        await Connection();

        const livroInstance = new blogModel(Livro);
        await livroInstance.save();
    } catch (error) {
        console.error("Error saving the document:", error);
    }
}


export async function ListarAllData(){
    try {
        await Connection();
        const blogPosts = await blogModel.find().exec();
        console.log(blogPosts)
        return blogPosts;
    }catch (error){
        console.log("error",error)
    }
}

export async function ListarById(Id) {
    try {
        await Connection();
        const blogPost = await blogModel.findOne({ id: Id }).exec();
        console.log(blogPost);
        return blogPost;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function DeleteLivroById(id){
    try {
         await blogModel.deleteOne({id: id});
        console.log("Deleted with suc")
    }catch (error){
        console.log("error",error)
    }
}
export async function UpdateLivro(Livro) {
    try {
        await Connection();

        const updatedLivro = await blogModel.findOneAndUpdate(
            { id: Livro.id },
            {
                Titulo: Livro.Titulo,
                Ano_Lancamento: Livro.Ano_Lancamento,
                Edicao: Livro.Edicao,
                Linguagem: Livro.Linguagem
            },
            { new: true }
        );

        if (updatedLivro) {
            return { success: true, livro: updatedLivro };
        } else {
            return { success: false, message: 'Livro not found' };
        }
    } catch (error) {
        console.error("Error updating livro:", error);
        return { success: false, error };
    }
}



export default { CreateDocument, ListarAllData ,DeleteLivroById};