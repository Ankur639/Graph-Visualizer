const response = {
  name: "PathNet -- Anatomic Pathology",
  children: [
    {
      name: "Apsdbcytoreportparams",
      children: [{
          name:"core",
          children:[],
      }],
    },
    { name: "Wordprocessingtemplatesexe", children: [] },

    { name: "ApsTxEditorCommon", children: [] },

    { name: "Apstranscription", children: [] },

    { name: "Apsmaintaincase", children: [] },

    { name: "Apsreportqueue", children: [] },

    { name: "Apsdbtools", children: [] },

    { name: "apsSlideShow", children: [] },

    { name: "APSDBSPECIMEN", children: [] },

    { name: "Apscytodailyslidecntexe", children: [] },
  ],
};

function child(name,response) {
  name.forEach((e) => {
    if (e.name === "core") {
        e.children="ssss"
      return ;
    } else if (e.children.length) child(e.children,response);
  });
}

child(response.children,response);
console.log(x);