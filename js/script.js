const nomePokemon = document.querySelector('.nomePokemon');
const numeroPokemon = document.querySelector('.numeroPokemon');
const imagemPokemon = document.querySelector('.imagemPokemon');

const form = document.querySelector('.buscaPokemon');
const input = document.querySelector('.inputSearch');
const botPrev = document.querySelector('.botaoPrev');
const botNext = document.querySelector('.botaoNext');

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {
    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (APIresponse.status == 200){
        
        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    nomePokemon.innerHTML = 'Carregando...';
    numeroPokemon.innerHTML = '';

    const data = await fetchpokemon(pokemon);
    if (data) { 
        imagemPokemon.style.display = 'block';
        nomePokemon.innerHTML = data.name; 
        numeroPokemon.innerHTML = data.id;
        imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'Não encontrado';
        numeroPokemon.innerHTML = '';
    }
}
 
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);

botPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

botNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

