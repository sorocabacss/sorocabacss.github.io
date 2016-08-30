
var container = document.getElementById("members");

console.log(container);

fetch('https://api.github.com/repos/sorocabacss/sorocabacss.github.io/contributors')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    json.map(function(user) {
      return fetch(user.url).then(function(response) {
        return response.json();
      }).then(function(user) {

        var li = document.createElement('li');
        var link = document.createElement('a');
        var image = document.createElement('img');
        var tooltip = document.createElement('p');

        image.src = user.avatar_url + '&s=40';
        image.alt = user.name;

        tooltip.appendChild(document.createTextNode(user.name));

        link.target = 'github';
        link.href = user.html_url;

        link.appendChild(image);
        li.appendChild(tooltip);
        li.appendChild(link);
        container.appendChild(li);
      });
    });

  }).catch(function(ex) {
    console.log('parsing failed', ex)
  });
