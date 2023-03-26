export const sendToSubscribers = (subscribers, eventType, id) => {
  if (eventType && subscribers) {
    const eventPromises = [];

    const applicableSubscribers = subscribers.filter(
      (sub) => sub.eventType === eventType
    );

    applicableSubscribers.map((sub) => {
      const eventPromise = fetch(sub.url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType: eventType,
          resourceId: id,
        }),
      });
      eventPromises.push(eventPromise);
    });

    Promise.all(eventPromises);
  }
};
