$(function(){
  function buildHTML(message){
    var html = `<div class = "message">
    <div class = "message__upper-info">
      <div class = "message__upper-info__talker">
          ${message.user.name}
      <div class = "message__upper-info__date">
        ${message.created_at.strftime("%Y/%m/%d %H:%M")}
      </div>
      </div>
    </div>
    <div class = "message__text">
      <% if message.content.present? %>
        <p class = "lower-message__content">
        ${message.content}
        </p>
      <% end %>
      <% if message.image.present? %>
        
      <% end%>
  
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
      $('.messages').append(html)
      $('#message_content').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})



