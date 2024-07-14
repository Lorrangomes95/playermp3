document.addEventListener('DOMContentLoaded', () => {
  const nomeMusica = document.getElementById("musica");
  const audio = document.getElementById("audio-musica");
  const botaoPlayPause = document.getElementById("play-pause");
  const botaoProximoMusica = document.getElementById("proximo");
  const botaoMusicaAnterior = document.getElementById("anterior");
  const singerSelect = document.getElementById("singerSelect");
  const volumeRange = document.getElementById('volumeRange');
  const volumeValue = document.getElementById('volumeValue');
  const capaAlbum = document.getElementById('capa');

  let taTocando = false;
  let currentTrackIndex = 0;
  let currentSinger = 'Nadson o Ferinha'; // Cantor padrão ao carregar a página

  // Lista de cantores e suas faixas
  const singers = {
    'Nadson o Ferinha': {
      capa: './images/dom-casmurro.jpg',
      faixas: [
        { title: 'Música 1', src: './books/dom-casmurro/1.mp3' },
        { title: 'Música 2', src: './books/dom-casmurro/2.mp3' },
        { title: 'Música 3', src: './books/dom-casmurro/3.mp3' },
        { title: 'Música 4', src: './books/dom-casmurro/4.mp3' },
        { title: 'Música 5', src: './books/dom-casmurro/5.mp3' },
        { title: 'Música 6', src: './books/dom-casmurro/6.mp3' },
        { title: 'Música 7', src: './books/dom-casmurro/7.mp3' },
        { title: 'Música 8', src: './books/dom-casmurro/8.mp3' },
        { title: 'Música 9', src: './books/dom-casmurro/9.mp3' },
        { title: 'Música 10', src: './books/dom-casmurro/10.mp3' }
      ]
    },
    'Toque Dez': {
      capa: './images/cd_cover.jpeg',
      faixas: [
        { title: 'VAQUEIRA', src: './books/TOQUEDEZ/01 - VAQUEIRA.mp3.mp3' },
        { title: 'GOSTA DE RUA', src: './books/TOQUEDEZ/02 - GOSTA DE RUA.mp3.mp3' },
        { title: 'VAQUEJADA É VAQUEJADA', src: './books/TOQUEDEZ/03 - VAQUEJADA É VAQUEJADA.mp3.mp3' },
        { title: 'VAI OU FICA', src: './books/TOQUEDEZ/04 - VAI OU FICA.mp3.mp3' },
        { title: 'DESEJOS', src: './books/TOQUEDEZ/05 - DESEJOS.mp3.mp3' },
        { title: 'DEIXA A GENTE QUIETO', src: './books/TOQUEDEZ/06 - DEIXA A GENTE QUIETO.mp3.mp3' },
        { title: 'DIGITANDO', src: './books/TOQUEDEZ/07 - DIGITANDO.mp3.mp3' },
        { title: 'PRIORIDADE', src: './books/TOQUEDEZ/08 - PRIORIDADE.mp3.mp3' },
        { title: 'BEM MAS QUE EU', src: './books/TOQUEDEZ/09 - BEM MAS QUE EU.mp3.mp3' },
        { title: 'DOIS TRISTES', src: './books/TOQUEDEZ/10 - DOIS TRISTES.mp3.mp3' },
        { title: 'ALÔ AMOR', src: './books/TOQUEDEZ/11 - ALÔ AMOR.mp3.mp3' },
        { title: 'DEU MORAL', src: './books/TOQUEDEZ/12 - DEU MORAL.mp3.mp3' },
        { title: 'LONGE DE VOCÊ', src: './books/TOQUEDEZ/13 - LONGE DE VOCÊ.mp3.mp3' },
        { title: 'TORRE EIFFEL', src: './books/TOQUEDEZ/14 - TORRE EIFFEL.mp3.mp3' },
        { title: 'SÃO AMORES', src: './books/TOQUEDEZ/15 - Bloquinho de SJ -  SÃO AMORES- NÃO SOU DE NINGUÉM.mp3.mp3' },
        { title: 'A LUA', src: './books/TOQUEDEZ/16 - A LUA.mp3.mp3' },
        { title: 'DENGOSA', src: './books/TOQUEDEZ/17 - DENGOSA.mp3.mp3' },
        { title: 'OLHO ENCHARCADO', src: './books/TOQUEDEZ/18 - OLHO ENCHARCADO.mp3.mp3' },
        { title: 'SÓ TE AMEI', src: './books/TOQUEDEZ/19 - SÓ TE AMEI.mp3.mp3' },
        { title: 'TE ENCONTREI', src: './books/TOQUEDEZ/20 - TE ENCONTREI.mp3.mp3' },
        { title: 'BRINQUEDO', src: './books/TOQUEDEZ/21 - BRINQUEDO.mp3.mp3' },
        { title: 'PENSA DIREITO', src: './books/TOQUEDEZ/22 - PENSA DIREITO.mp3.mp3' },
        { title: 'MENTIRA', src: './books/TOQUEDEZ/23 - MENTIRA.mp3.mp3' },
        { title: 'SERÁ QUE FOI SORTE', src: './books/TOQUEDEZ/24 - SERÁ QUE FOI SORTE.mp3.mp3' }
      
      ]
    }
    // Adicione mais cantores conforme necessário
  };

  // Carregar faixas para o cantor selecionado
  function loadTracksForSinger(singer) {
    currentSinger = singer;
    currentTrackIndex = 0;
    loadTrack(currentTrackIndex);
    // Atualizar a capa do álbum
    capaAlbum.src = singers[singer].capa;
  }

  // Carregar uma faixa específica
  function loadTrack(index) {
    const track = singers[currentSinger].faixas[index];
    audio.src = track.src;
    nomeMusica.textContent = track.title;
    audio.load();
  }

  // Controlar reprodução
  function togglePlayPause() {
    if (audio.paused || audio.ended) {
      playTrack();
    } else {
      pauseTrack();
    }
  }

  function playTrack() {
    audio.play();
    botaoPlayPause.classList.remove("bi-play-circle-fill");
    botaoPlayPause.classList.add("bi-pause-circle-fill");
    taTocando = true;
  }

  function pauseTrack() {
    audio.pause();
    botaoPlayPause.classList.remove("bi-pause-circle-fill");
    botaoPlayPause.classList.add("bi-play-circle-fill");
    taTocando = false;
  }

  // Botão anterior
  function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + singers[currentSinger].faixas.length) % singers[currentSinger].faixas.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }

  // Botão próximo
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % singers[currentSinger].faixas.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }

  // Event listeners para botões e seleção de cantores
  botaoPlayPause.addEventListener("click", togglePlayPause);
  botaoMusicaAnterior.addEventListener("click", previousTrack);
  botaoProximoMusica.addEventListener("click", nextTrack);

  // Evento ao selecionar um cantor no seletor
  singerSelect.addEventListener('change', (event) => {
    loadTracksForSinger(event.target.value);
  });

  // Preencher seletor de cantores
  function populateSingerSelect() {
    for (const singer in singers) {
      const option = document.createElement('option');
      option.value = singer;
      option.textContent = singer;
      singerSelect.appendChild(option);
    }
  }

  // Controle de volume
  volumeRange.addEventListener('input', function () {
    audio.volume = this.value / 100;
    volumeValue.textContent = this.value;
  });

  // Inicialização do player com o cantor padrão
  populateSingerSelect();
  loadTracksForSinger(currentSinger);

  // Inicializar volume com o valor inicial da barra de volume
  audio.volume = volumeRange.value / 100;
});
