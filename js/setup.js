function loadFile(...paths) {
  for (let path of paths) {
    let e = document.createElement('script');
    e.src = path;
    document.getElementsByTagName('head')[0].appendChild(e);
  }
}

loadFile('https://code.jquery.com/jquery-3.3.1.min.js',
        '/js/setTitle.js');
