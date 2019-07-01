$(function(){
  var search_list = $("#user-search-result");
  function  appendUser(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div id="btn" class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>

    `
  search_list.append(html)
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class='listview__element--right-icon'>${ msg }</div>
                `
    search_list.append(html);
  }

  $('#user-search-field').on('keyup',function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {name: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
})



$(function(){
  var member_list = $('#chat-group-users')
  function appendMember(user){
  
    var name = $(user).attr('data-user-name');
    var id = $(user).attr('data-user-id');
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
    <input id='group_user_ids' name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div id='remove' class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  member_list.append(html);
  };

  $(document).on("click",`#btn`,function(e){
    var user = e.target
    appendMember(user);
    $(this).unwrap();
    $(this).prev().remove();
    $(this).remove();
  })
})

$(function(){
  $(document).on('click','#remove',function(){
    $(this).unwrap();
    $(this).prev().remove();
    $(this).remove();
  })
})