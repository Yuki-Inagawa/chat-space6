
json.content    @message.content 
json.image      @message.image.url 
json.group_id   @message.group.id
json.user       @message.user
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id         @message.id
json.name       @message.user.name