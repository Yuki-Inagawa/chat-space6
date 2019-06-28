$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `<img src=${message.image}>` : "";
    var html = `<div class = "message">
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

      return false;
    })
    .fail(function(){
      alert('error');
    })
  })
})



