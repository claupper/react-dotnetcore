import { useEffect, useState } from 'react'

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
}

export default function AtividadeForm(props) {

    const [atividade, setAtividade] = useState(atividadeAtual());

    useEffect (() => {
        if(props.ativSelecionada.id !== 0) setAtividade(props.ativSelecionada);
    } , [props.ativSelecionada]); // conchetes serve para fazer com que o useEffect rode apenas 1 vez

    const inputTextHandler = (e) => {
        const {name, value} = e.target;

        setAtividade({...atividade, [name]: value});
    };

    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarAtividade();

        setAtividade(atividadeInicial);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(props.ativSelecionada.id !== 0)
            props.atualizarAtividade(atividade);
        else
            props.addAtividade(atividade);

        setAtividade(atividadeInicial);    
    };

    function atividadeAtual(){
        if(props.ativSelecionada.id !== 0) {
            return props.ativSelecionada;
        }else{
            return atividadeInicial;
        }
    }
       
  return (
    <>
    <h1>Atividades</h1>
    <form className='row g-3' onSubmit={handleSubmit} >

        <div className='col-md-6'>  
            <label className='form-label'>Título</label>
            <input id='titulo' name='titulo' type="text" placeholder='titulo' className='form-control' value={atividade.titulo} onChange={inputTextHandler} />
        </div>

        <div className='col-md-6'>
            <label className='form-label'>Prioridade</label>
            <select id='prioridade' name='prioridade' className='form-select' value={atividade.prioridade} onChange={inputTextHandler}>
                <option defaultValue={0}>Selecione...</option>
                <option value={1}>Baixa</option>
                <option value={2}>Normal</option>
                <option value={3}>Alta</option>
            </select>
        </div>

        <div className='col-md-12'>  
            <label className='form-label'>Descrição</label>
            <textarea id='descricao' name='descricao' type="text" placeholder='descricao' className='form-control' value={atividade.descricao} onChange={inputTextHandler}/>
        </div>

        <hr />

        <div className='col-12'>
            { atividade.id === 0 ? (
                    <button className='btn btn-outline-secondary' type='submit'>+ Atividade</button>
                ) : (
                <>
                    <button className='btn btn-outline-secondary me-2' type='submit'>+ Salvar</button>
                    <button className='btn btn-outline-secondary me-2' onClick={handleCancelar}>+ Cancelar</button>    
                </>
            )}
        </div>
    </form>
    </>
  );
}
