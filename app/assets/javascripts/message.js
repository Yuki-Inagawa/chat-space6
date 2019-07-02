$(document).on('turbolinks:load', function() { 

$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img src=${message.image}>` : "";
    var html = `<div class = "message" data-message_id=${message.id}>
    <div class = "message__upper-info">
      <div class = "message__upper-info__talker">
        ${message.user.name}
      <div class = "message__upper-info__date">
        ${message.created_at}
      </div>
      </div>
    </div>
    <div class = "message__text">
        <p class = "lower-message__content">
        ${content}
        </p>
        ${image}
    </div>
  
  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
      $(".submit-btn").prop("disabled", false);
      return false;
    })
    .fail(function(){
      alert('error');
    })
  })
 

  var buildMessageHTML = function(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img src=${message.image}>` : "";
    if (message.content && message.image) {
      
      var html = `<div class = "message" data-message-id=${message.id}>
      <div class = "message__upper-info">
        <div class = "message__upper-info__talker">
          ${message.name}
        <div class = "message__upper-info__date">
          ${message.created_at}
        </div>
        </div>
      </div>
      <div class = "message__text">
          <p class = "lower-message__content">
          ${content}
          </p>
          ${image}
      </div>
    
    </div>`
    } else if (message.content) {
      var html = `<div class = "message" data-message-id=${message.id}>
      <div class = "message__upper-info">
        <div class = "message__upper-info__talker">
          ${message.name}
        <div class = "message__upper-info__date">
          ${message.created_at}
        </div>
        </div>
      </div>
      <div class = "message__text">
          <p class = "lower-message__content">
          ${content}
          </p>
      </div>
    
    </div>`
    } else if (message.image) {
      var html = `<div class = "message" data-message-id=${message.id}>
      <div class = "message__upper-info">
        <div class = "message__upper-info__talker">
          ${message.name}
        <div class = "message__upper-info__date">
          ${message.created_at}
        </div>
        </div>
      </div>
      <div class = "message__text">
          ${image}
      </div>
    
    </div>`
    };
    return html;
  };
  
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
     
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        console.log("自動更新中")
      var insertHTML = '';
        messages.forEach(function(message){
          insertHTML =  buildMessageHTML(message);
          $('.messages').append(insertHTML);
          
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        console.log('自動更新に失敗しました');
      });
    }
    };
   setInterval(reloadMessages, 5000)
})
});

