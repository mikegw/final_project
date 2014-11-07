FinalProject.Views.NotificationsIndex = Backbone.CompositeView.extend({

  initialize: function () {
    var that = this;
    this.collection = new FinalProject.Collections.Notifications();
    this.collection.fetch({
      success: (function(){
        console.log("Howdy");
        that.render();
      })
    })
  },



  tagName: 'section',
  className: 'notifications',

  template: JST["notifications/index"],

  render: function () {
    var content = this.template();
    this.$el.html(content)

    var that = this
    this.collection.each(function (notification){
      console.log("getting there");
      var show = new FinalProject.Views.NotificationShow({
        model: notification
      })

      that.addSubview(".notifications-list", show);
    });

    return this;

  },


  toggleDisplay: function () {
    console.log("YAY");
    $(".notifications ul").toggleClass("active");
    _(this.subviews("notifications-list")).each(function(show){
      show.read();
    });
  }

})
