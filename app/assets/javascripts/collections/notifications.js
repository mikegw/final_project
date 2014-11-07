FinalProject.Collections.Notifications = Backbone.Collection.extend({

  model: FinalProject.Models.Notification,
  url: 'api/notifications'

});

FinalProject.notifications = new FinalProject.Collections.Notifications();
