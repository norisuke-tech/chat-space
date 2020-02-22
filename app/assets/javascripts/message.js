$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="chat-main__group">
           <div class="chat-main__group--name">
             ${message.user_name}
           </div>
           <div class="chat-main__group--name--time">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message--info">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__group">
          <div class="chat-main__group--name">
            ${message.user_name}
          </div>
          <div class="chat-main__group--name--time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message--info">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;
   };
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
   $('.chat-main').append(html);    
   $('form')[0].reset();
   $('.chat-main').animate({ scrollTop: $('.chat-main')[0].scrollHeight});
   $('.submit-btn').prop('disabled', false);
 })
 .fail(function(){
   alert('error');
 })
})
var reloadMessages = function() {
  
  last_message_id = $('.message:last').data("message-id");
  console.log(last_message_id);
  $.ajax({

    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      
      $('.chat-main').append(insertHTML);
    }
  })
  .fail(function() {
    console.log('error');
  });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 1000);
  }
});