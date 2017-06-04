'use strict';

$(document).ready(function(){
  //console.log("loaded!!!");
  $('#searchUser').on('keyup',function(e){
    var usrname = e.target.value;

    // Make req to Github
    $.ajax({
      url: 'https://api.github.com/users/'+usrname,
      data: {
        client_id: 'fe64cafb79a61b73ce9f',
        client_secret: '89bfe54b990615ab81e9c5e5a979039b3390579d'
      },
      success: function(user) {
        $.ajax({
          url: 'https://api.github.com/users/'+usrname+'/repos',
          data: {
            client_id: 'fe64cafb79a61b73ce9f',
            client_secret: '89bfe54b990615ab81e9c5e5a979039b3390579d',
            sort: 'created: asc',
            per_page: 5
          },
          success: function(repos){
            $.each(repos,function(index,repo){
                $('#repos').append(`
                    <div class="well">
                      <div class="row">
                        <div class="col-md-7">
                          <strong>${repo.name}</strong> : ${repo.description}
                        </div>
                        <div class="col-md-3">
                          <span class="label label-success">Forks: ${repo.forks_count}</span>
                          <span class="label label-info">Watchers: ${repo.watchers_count} </span>
                          <span class="label label-warning">Stars: ${repo.stargazers_count} </span>
                        </div>
                        <div class="col-md-2">
                          <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
                        </div>
                      </div>
                    </div>
                `);
            });
          }
        });

        // console.log(data);
        $('#profile').html(`
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                  <div class="col-md-3">
                    <img src="${user.avatar_url}" class="thumbnail img-responsive">
                    <a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">Go to Profile</a>
                  </div>
                  <div class="col-md-9">
                  <button class="btn btn-success" type="button">
                    Public Repos <span class="badge">${user.public_repos}</span>
                  </button>
                  <button class="btn btn-success" type="button">
                    Public Gists <span class="badge">${user.public_gists}</span>
                  </button>
                  <button class="btn btn-info" type="button">
                    Followers <span class="badge">${user.followers}</span>
                  </button>
                  <button class="btn btn-info" type="button">
                    Following <span class="badge">${user.following}</span>
                  </button>
                  <br><br>

                  <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/blog: ${user.blog}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                  </ul>

                  </div>
              </div>
            </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
          `);
      }
    });
  });
});
