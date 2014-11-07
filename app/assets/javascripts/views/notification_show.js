FinalProject.Views.NotificationShow = Backbone.View.extend({

  tagName: 'li',
  className: "notification",

  template: JST["notifications/show"],

  render: function () {
    console.log("rendering noteshow", this.model)

    var rawtime = this.model.escape("created_at");
    var time = new Date(rawtime);
    var parsedTime = time.toLocaleTimeString();


    var content = this.template({
      notification: this.model,
      time: parsedTime
    });
    this.$el.html(content);
    return this;
  },

  read: function () {
    if(!this.model.get("is_read")){
      this.model.fetch();
    }
  }

})
