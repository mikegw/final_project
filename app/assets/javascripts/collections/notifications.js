FinalProject.Collections.Notifications = Backbone.Collection.extend({

  model: FinalProject.Models.Notification,
  url: 'api/notifications',

  // comparator: function (model1, model2) {
  //   return !((("0" + (model1.created_at + "")).slice(-8)) < (("0" + (model2.created_at + "")).slice(-8)));
  // }

});

FinalProject.notifications = new FinalProject.Collections.Notifications();
