// Obtenir toutes les images sur la page
const images = document.getElementsByTagName('img');

// Définir le chemin d'accès absolu du dossier Téléchargements
const downloadFolder = `${window.navigator.userAgent.indexOf("Win") != -1 ? 'C:\\Users\\viann\\Downloads\\' : '/Users/viann/Downloads/'}`;

// Fonction pour télécharger l'image à partir d'un lien
function downloadImage(link, filename) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (this.status === 200) {
      const blob = new Blob([this.response], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.error(`Impossible de télécharger ${filename}`);
    }
  };
  xhr.onerror = function() {
    console.error(`Impossible de télécharger ${filename}`);
  };
  xhr.send();
}

// Télécharger chaque image en utilisant le lien et un nom de fichier unique
for (let i = 0; i < images.length; i++) {
  const filename = `image${i}.jpg`;
  const link = images[i].src;
  if (link.startsWith('http') || link.startsWith('https')) {
    downloadImage(link, downloadFolder + filename);
  } else {
    console.error(`Impossible de télécharger ${filename}: URL non valide`);
  }
}
