var login = function () {
    var name = $("#username").val();
    name = name.trim();
    var pass = $("#pass").val();
    var tenantDomain = $("#tenant").val();
    jagg.post("/site/blocks/user/login/ajax/login.jag", { action:"login", username:name, password:pass,tenant:tenantDomain },
              function (result) {
                  if (!result.error) {
                      var current = window.location.pathname;
                      var currentHref=window.location.search;
                      var requestedPage=getParameterByName("requestedPage");
                      var queryParam;
                      //siteContext is a global variable set in page/base/template.jag with the Publisher site context
                      if (requestedPage && requestedPage.startsWith(siteContext)) {
                          window.location.href = requestedPage;
                      } else {
                        if(currentHref.indexOf("tenant")>-1){queryParam=currentHref;}
                        else{queryParam='';}
                        if (current.indexOf(".jag") >= 0) {
                            location.href = "index.jag"+queryParam;
                        } else {
                            location.href = 'site/pages/index.jag'+queryParam;
                        }
                      }

                  } else {
                      var text = jQuery('<div />').text( result.message );
                      $('#loginErrorMsg').show();
                      //@todo: param_string
                      $('#loginErrorMsg').html('<i class="icon fw fw-error"></i><strong>'  + i18n.t("Error! ") +
                      '</strong>' + text.html() + '<button type="button" class="close" aria-label="close" data-dismiss="alert"><span aria-hidden="true"><i class="fw fw-cancel"></i></span></button>');
                      
                  }
              }, "json");


};

$(document).ready(
        function() {
            $('#username').focus();
            $('#username').keydown(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    login();
                }
            });
            $('#pass').keydown(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    login();
                }
            });
        }
        );

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}