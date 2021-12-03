import { useEffect, useState } from "react"
import {db} from "./FirebaseConnect"
import {collection, addDoc, getDocs, deleteDoc, doc} from "firebase/firestore" 
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const alunosCollectionRef = collection(db, "alunos")
  const cursosCollectionRef = collection(db, "cursos")
  const [alunos, setAlunos] = useState([])
  const [cursos, setCursos] = useState([])

  const [newNome, setNewNome] = useState("")
  const [newIdade, setNewIdade] = useState("")
  const [newCidade, setNewCidade] = useState("")

  const [newNomeCurso, setNomeCurso] = useState("")
  const [newCampus, setNewCampus] = useState("")
  const [newDuracao, setNewDuracao] = useState("")
  const [newPeriodo, setNewPeriodo] = useState("")
  
  useEffect (() => {
    const getAlunos = async () => {
      const data = await getDocs(alunosCollectionRef)
      setAlunos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getCursos = async () => {
      const data = await getDocs(cursosCollectionRef)
      setCursos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getAlunos()
    getCursos()
  }, [])

  const cadastrarAluno = async () => {
    await addDoc(alunosCollectionRef, {cidade:newCidade,
                                       curso:document.getElementById("curso").value,
                                       idade:newIdade,
                                       nome:newNome})
    document.location.reload(true);
  }
  const cadastrarCurso = async () => {
    await addDoc(cursosCollectionRef, {alunos: 0,
                                       campus: newCampus,
                                       duracao: newDuracao,
                                       nome:newNomeCurso,
                                       periodo: newPeriodo})
    document.location.reload(true);
  }

  const deleteAluno = async (id) => {
    const alunoDoc = doc(db, "alunos", id)
    await deleteDoc(alunoDoc)
    document.location.reload(true);
  }

  const deleteCurso = async (id) => {
    const cursoDoc = doc(db, "cursos", id)
    await deleteDoc(cursoDoc)
    document.location.reload(true);
  }

  return (
    <div className="container d-flex">
      <div className="colunas col-md-6">
        <div className="display-4" align="center">
          Alunos
        </div>
        <div className="form-group row mb-md-2">
          <label for="nomealuno" className="col-sm-2 col-form-label">Nome</label>
          <div className="col-sm-10">
            <input type="text" class="form-control" id="nomealuno" onChange={(e) => {setNewNome(e.target.value)}}/>
          </div>
        </div>
        <div class="form-group row mb-md-2">
          <label for="idade" class="col-sm-2 col-form-label">Idade</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="idade" onChange={(e) => {setNewIdade(e.target.value)}}/>
          </div>  
        </div>
        <div class="form-group row mb-md-2">
          <label for="cidade" class="col-sm-2 col-form-label">Cidade</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="cidade" onChange={(e) => {setNewCidade(e.target.value)}}/>
          </div>  
        </div>
        <div class="form-group row mb-md-2">
          <label for="curso" class="col-sm-2 col-form-label">Curso</label>
          <div class="col-sm-10">
            <select className="form-control" id="curso">
              <option selected>Não matriculado</option>
              {cursos.map((curso) => {
                return(
                <option value={curso.nome}>{curso.nome}</option>
                )
              })}
            </select>
          </div>  
        </div>
        <button className="btn btn-secondary" onClick={cadastrarAluno}>Cadastrar</button>
        <hr/>
        <table className="table table-striped align-items-end">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Idade</th>
              <th scope="col">Cidade</th>
              <th scope="col">Curso</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => {
              return(
                <tr>
                  <td>{aluno.nome}</td>
                  <td>{aluno.idade}</td>
                  <td>{aluno.cidade}</td>
                  <td>{aluno.curso}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => {deleteAluno(aluno.id)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="colunas col-md-6">
      <div className="display-4" align="center">
          Cursos
        </div>
        <div class="form-group row mb-md-2">
            <label for="nomecurso" class="col-sm-2 col-form-label">Nome</label>
            <div class="col-sm-10">
              <input type="text" className="form-control" id="nomecurso" onChange={(e) => {setNomeCurso(e.target.value)}}/>
            </div>
        </div>
        <div class="form-group row mb-md-2">
            <label for="campus" class="col-sm-2 col-form-label">Campus</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="campus" onChange={(e) => {setNewCampus(e.target.value)}}/>
            </div>  
        </div>
        <div class="form-group row mb-md-2">
            <label for="duracao" class="col-sm-2 col-form-label">Duração</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="duracao" onChange={(e) => {setNewDuracao(e.target.value)}}/>
            </div>  
        </div>
        <div class="form-group row mb-md-2">
            <label for="periodo" class="col-sm-2 col-form-label">Periodo</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="periodo" onChange={(e) => {setNewPeriodo(e.target.value)}}/>
            </div>  
        </div>
        <button className="btn btn-secondary" onClick={cadastrarCurso}>Adicionar</button>
        <hr/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Campus</th>
              <th scope="col">Duração</th>
              <th scope="col">Periodo</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
          {cursos.map((curso) => {
              return(
                <tr>
                  <td>{curso.nome}</td>
                  <td>{curso.campus}</td>
                  <td>{curso.duracao}</td>
                  <td>{curso.periodo}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => {deleteCurso(curso.id)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
