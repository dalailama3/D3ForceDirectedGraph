$("document").ready(function () {
  $.ajax({
    url: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
    dataType: "json"
  }).done(function (data) {
      var links = data.links
      var countries = data.nodes

      var hash = {};
      links.forEach((link)=> {
        var sourceCountry = countries[link.source].country
        var borderingCountry = countries[link.target].country
        if (hash[sourceCountry]) {
          hash[sourceCountry].push(borderingCountry)
        } else {
          hash[sourceCountry] = [borderingCountry]
        }

        if (hash[borderingCountry]) {
          if (hash[borderingCountry].indexOf(sourceCountry) === -1) {
            hash[borderingCountry].push(sourceCountry)
          }
        } else {
            hash[borderingCountry] = [sourceCountry]
          }


      })
      console.log(hash)
  })
});
