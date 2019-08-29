export default {
  guest: {
    detail: id => `https://${process.env.WEB_APP_URL}/guests/${id}`
  },
  reservation: {
    edit: dateId =>
      `https://${process.env.WEB_APP_URL}/reservations/edit/${dateId}`
  }
};
