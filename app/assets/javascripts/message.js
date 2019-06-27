$(function(){
  function buildHTML(message){
    var html = `<p>test</p>`
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

// $(function(){
//   $('#new_message').on('submit',function(){
//     console.log ("test")
//   })
// })

