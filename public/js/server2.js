$(document).ready(() => {
  const endpoint = "https://auth.predicthq.com/token";
  const token =
    "M1FCSGdRYWxvZ0U6VW1hRUxrUnYzZ0Q3TFdiV3pEYzZQb2JDdUVuWXJBX2JNdms1aklCb0dsLWRMa0tUaThwS3d3";
  let accessToken = null;
  $.ajax({
    url: endpoint,
    method: "POST",
    headers: {
      Authorization: "Basic " + token,
      "Content-Type": "application/x-www-form-urlcoded",
    },
    data: "grant_type=client_credentials&scope=places",
  }).then((placeauthresponse) => {
    // console.log(placeauthresponse);
    accessToken = placeauthresponse.access_token;
    $.ajax({
      url: "https://api.predicthq.com/v1/places/?q=Nottingham,England",
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((placesresponse) => {
      $.ajax({
        url: endpoint,
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/x-www-form-urlcoded",
        },
        data: "grant_type=client_credentials&scope=events",
      }).then((eventsauthresponse) => {
        accessToken = eventsauthresponse.access_token;
        // console.log(eventsauthresponse);
        $.ajax({
          url: "https://api.predicthq.com/v1/events/?place.scope=5128638",
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }).then((eventsresponse) => {
          console.log(eventsresponse, placesresponse);
        });
      });
    });
  });
});


// $(document).ready(() => {
//   const endpoint = "https://auth.predicthq.com/token";
//   const token =
//     "NFlkQVQ2ZGE0QUE6OEF6VzZicWdTWUFMVHNJUWVoNnN4MGN3dnJHRk5nb3pEWE1hZlNELU55MF9hV19yMmduRGN3";
//   let accessToken = null;
//   $.ajax({
//     url: endpoint,
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + token,
//       "Content-Type": "application/x-www-form-urlcoded",
//     },
//     data: "grant_type=client_credentials&scope=events",
//   }).then((response) => {
//     console.log(response);
//     accessToken = response.access_token;
//     $.ajax({
//       url: "https://api.predicthq.com/v1/events/?place.scope=5128638",
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + accessToken,
//       },
//     }).then((response) => {
//       console.log(response);
//     });
//   });
// });
