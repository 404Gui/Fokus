// Encontrar o valro dos botões

const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea')
const ulTarefa = document.querySelector('.app__section-task-list');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const btnDeletar = document.querySelector('.app__form-footer__button--delete');

tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


function atualizarTarefa() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

}

function criandoElementosTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');


    const svg = document.createElement('svg');
    svg.innerHTML = `
    
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt("Como deseja atualizar?")
        console.log("nova tarefa:", novaDescricao);
        if (novaDescricao) {            
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefa();

        }

    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);


    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li
}


const deletandoForm = () => {
    textArea.value = ''
}

btnDeletar.addEventListener('click', deletandoForm);

const limparForm = () => {
    textArea.value = ''
    formAdicionarTarefa.classList.toggle('hidden');
    
}
btnCancelarTarefa.addEventListener('click', limparForm);

// btnCancelarTarefa.addEventListener('click', () => {
//     formAdicionarTarefa.classList.toggle('hidden');
//     textArea.value = ''

// })

btnAddTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (eventoo) => {
    eventoo.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    elementoTarefa = criandoElementosTarefa(tarefa);
    ulTarefa.append(elementoTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden');

})

tarefas.forEach(tarefa => {
    const elementoTarefa = criandoElementosTarefa(tarefa);
    ulTarefa.append(elementoTarefa);
})