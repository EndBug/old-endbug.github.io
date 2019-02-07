function setTitle(title) {
  $().ready(() => {
    $('.project-name').first().text(title);
  });
}
